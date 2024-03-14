import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';

function FormularioEdicao({ itemEditado, onCancel, onSave }) {
 
  const formatarDocumento = (documento) => {
    if (!documento) return '';
    const cleaned = ('' + documento).replace(/\D/g, '');
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (cleaned.length === 14) {
      return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    return documento;
  };

  const formatarTelefone = (telefone) => {
    if (!telefone) return '';
    const cleaned = ('' + telefone).replace(/\D/g, '');
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
    } else if (cleaned.length === 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return telefone;
  };

  const limparMascara = (documento) => {
    return documento.replace(/[^\d]+/g, '');
  };

  const [formData, setFormData] = useState({
    nome: itemEditado ? itemEditado.nome : '',
    celular: itemEditado ? formatarTelefone(itemEditado.celular) : '',
    documento_identificacao: itemEditado ? formatarDocumento(itemEditado.documento_identificacao) : '',
    endereço: itemEditado ? itemEditado.endereço : '',
    empresa: itemEditado ? itemEditado.empresa : '',
    setor: itemEditado ? itemEditado.setor : '',
    comercial: itemEditado ? formatarTelefone(itemEditado.comercial) : '',
    outros: itemEditado ? formatarTelefone(itemEditado.outros) : '',
  });

  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: fieldName.includes('celular') || fieldName.includes('comercial') || fieldName.includes('outros') ? formatarTelefone(value) : value });
  };

  const handleSave = async () => {
    try {
      const cleanedData = {
        ...formData,
        documento_identificacao: limparMascara(formData.documento_identificacao),
        celular: limparMascara(formData.celular),
        comercial: limparMascara(formData.comercial),
        outros: limparMascara(formData.outros)
      };

      const response = await fetch(`https://call-list-api.onrender.com/person/${itemEditado._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Erro ao atualizar pessoa');
      }

      onSave(formData);
    } catch (error) {
      console.error('Erro ao atualizar pessoa:', error.message);
    }
  };

  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '50px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', zIndex: 9999 }}>
      <p style={{ marginBottom: '4px', fontSize: '1rem', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Editar Dados</p>
      <TextField label="Nome" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} fullWidth style={{ marginBottom: '5px' }} />
      <TextField label="Celular" value={formData.celular} onChange={(e) => handleInputChange('celular', e.target.value)} fullWidth inputProps={{ maxLength: 15 }} style={{ marginBottom: '5px' }} />
      <TextField label="Documento de Identificação" value={formData.documento_identificacao} onChange={(e) => handleInputChange('documento_identificacao', e.target.value)} fullWidth inputProps={{ maxLength: 18 }} style={{ marginBottom: '5px' }} />
      <TextField label="Endereço" value={formData.endereço} onChange={(e) => setFormData({ ...formData, endereço: e.target.value })} fullWidth style={{ marginBottom: '5px' }} />
      <TextField label="Empresa" value={formData.empresa} onChange={(e) => setFormData({ ...formData, empresa: e.target.value })} fullWidth style={{ marginBottom: '5px' }} />
      <TextField label="Setor" value={formData.setor} onChange={(e) => setFormData({ ...formData, setor: e.target.value })} fullWidth style={{ marginBottom: '5px' }} />
      <TextField label="Telefone Comercial" value={formData.comercial} onChange={(e) => handleInputChange('comercial', e.target.value)} fullWidth inputProps={{ maxLength: 14 }} style={{ marginBottom: '5px' }} />
      <TextField label="Outros" value={formData.outros} onChange={(e) => handleInputChange('outros', e.target.value)} fullWidth inputProps={{ maxLength: 14 }} style={{ marginBottom: '5px' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <Button variant="outlined" onClick={onCancel}>Cancelar</Button>
        <Button variant="contained" color="primary" startIcon={<SendIcon />} onClick={handleSave}>Salvar</Button>
      </div>
    </div>
  );
}

export default FormularioEdicao;
