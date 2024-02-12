import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';

function Formulario({ handleSubmit, handleFecharFormulario }) {
  const [formData, setFormData] = useState({
    nome: '',
    documentoIdentificacao: '',
    empresa: '',
    setor: '',
    endereco: '',
    comercial: '',
    celular: '',
    outros: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['celular', 'comercial', 'outros'].includes(name)) {
      if (/^\d+$/.test(value) || value === '') {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await handleSubmit(formData);
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
    setFormData({
      nome: '',
      documentoIdentificacao: '',
      empresa: '',
      setor: '',
      endereco: '',
      comercial: '',
      celular: '',
      outros: '',
    });
  };

  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', zIndex: 9999 }}>
      <form onSubmit={handleSubmitForm}>
        <TextField name="nome" label="Nome" value={formData.nome} onChange={handleChange} fullWidth />
        <TextField name="documentoIdentificacao" label="Documento Identificação" value={formData.documentoIdentificacao} onChange={handleChange} fullWidth />
        <TextField name="empresa" label="Empresa" value={formData.empresa} onChange={handleChange} fullWidth />
        <TextField name="setor" label="Setor" value={formData.setor} onChange={handleChange} fullWidth />
        <TextField name="endereco" label="Endereço" value={formData.endereco} onChange={handleChange} fullWidth />
        <TextField name="comercial" label="Comercial" value={formData.comercial} onChange={handleChange} fullWidth />
        <TextField name="celular" label="Celular" value={formData.celular} onChange={handleChange} fullWidth />
        <TextField name="outros" label="Outros" value={formData.outros} onChange={handleChange} fullWidth />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <Button type="submit" variant="contained" startIcon={<SendIcon />}>Enviar</Button>
          <Button variant="outlined" onClick={handleFecharFormulario}>Cancelar</Button>
        </div>
      </form>
    </div>
  );
}

export default Formulario;
