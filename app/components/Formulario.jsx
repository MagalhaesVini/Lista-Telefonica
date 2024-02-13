import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';

function Formulario({ handleSubmit, handleFecharFormulario }) {
  const initialState = {
    nome: '',
    documento_identificacao: '',
    empresa: '',
    setor: '',
    endereço: '',
    comercial: '',
    celular: '',
    outros: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState('');
  const [requiredFields, setRequiredFields] = useState(['nome', 'celular']);

  const isValidCPF = (cpf) => {
    return cpf.length === 11;
  };

  const isValidCNPJ = (cnpj) => {
    return cnpj.length === 14;
  };

  const formatDocument = (value) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 11) {
      return numericValue.replace(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/, '$1.$2.$3-$4');
    } else {
      return numericValue.replace(/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})$/, '$1.$2.$3/$4-$5');
    }
  };

  const formatPhone = (value) => {
    const numericValue = value.replace(/\D/g, '');
    return numericValue.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'documento_identificacao') {
      newValue = formatDocument(value);
    } else if (name === 'comercial') {
      newValue = value.replace(/\D/g, '');
      newValue = newValue.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    } else if (['celular', 'outros'].includes(name)) {
      newValue = value.replace(/\D/g, '');
      newValue = newValue.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4');
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const missingFields = requiredFields.filter(field => !formData[field]);
      if (missingFields.length > 0) {
        setErrorMessage(`Por favor, preencha os campos obrigatórios: ${missingFields.join(', ')}`);
        return;
      }

      const cleanedDocument = formData.documento_identificacao.replace(/\D/g, '');

      if (!isValidCPF(cleanedDocument) && !isValidCNPJ(cleanedDocument)) {
        setErrorMessage('Documento de identificação inválido. Por favor, insira um CPF ou CNPJ válido.');
        return;
      }

      const cleanedComercial = formData.comercial.replace(/\D/g, '');
      const cleanedPhone = formData.celular.replace(/\D/g, '');
      const cleanedOutros = formData.outros.replace(/\D/g, '');

      const response = await handleSubmit({
        ...formData,
        comercial: cleanedComercial,
        celular: cleanedPhone,
        outros: cleanedOutros,
        documento_identificacao: cleanedDocument,
      });
      if (response.error) {
        setErrorMessage(response.error);
      } else {
        setErrorMessage('');
        handleReset();
        handleFecharFormulario();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.');
    }
  };

  const handleReset = () => {
    setFormData(initialState);
  };

  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', zIndex: 9999 }}>
      <form onSubmit={handleSubmitForm}>
        {errorMessage && <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{errorMessage}</p>}
        <p style={{ marginBottom: '10px', fontSize: '1rem', fontWeight: 'bold' }}>Dados:</p>
        <TextField name="nome" label="Nome" value={formData.nome} onChange={handleChange} fullWidth required style={{ marginBottom: '10px' }} />
        <TextField name="documento_identificacao" label="Documento Identificação" value={formData.documento_identificacao} onChange={handleChange} fullWidth inputProps={{ maxLength: 18 }} required style={{ marginBottom: '10px' }} />
        <TextField name="empresa" label="Empresa" value={formData.empresa} onChange={handleChange} fullWidth style={{ marginBottom: '10px' }} />
        <TextField name="setor" label="Setor" value={formData.setor} onChange={handleChange} fullWidth style={{ marginBottom: '10px' }} />
        <TextField name="endereço" label="Endereço" value={formData.endereço} onChange={handleChange} fullWidth style={{ marginBottom: '10px' }} />
        <p style={{ marginBottom: '10px', fontSize: '1rem', fontWeight: 'bold' }}>Telefones:</p>
        <TextField name="comercial" label="Comercial" value={formData.comercial} onChange={handleChange} fullWidth inputProps={{ maxLength: 10 }} style={{ marginBottom: '10px' }} />
        <TextField name="celular" label="Celular" value={formData.celular} onChange={handleChange} fullWidth required inputProps={{ maxLength: 11 }} style={{ marginBottom: '10px' }} />
        <TextField name="outros" label="Outros" value={formData.outros} onChange={handleChange} fullWidth inputProps={{ maxLength: 11 }} style={{ marginBottom: '10px' }} />
        <div style={{ marginTop: '1px', display: 'flex', justifyContent: 'space-between' }}>
          <Button type="submit" variant="contained" startIcon={<SendIcon />}>Enviar</Button>
          <Button variant="outlined" onClick={handleFecharFormulario}>Cancelar</Button>
        </div>
      </form>
    </div>
  );
}

export default Formulario;
