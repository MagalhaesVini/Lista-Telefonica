import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';

function FormularioEdicao({ itemEditado, onCancel, onSave }) {
  const [formData, setFormData] = useState({
    nome: itemEditado ? itemEditado.nome : '',
    celular: itemEditado ? itemEditado.celular : '',
    documentoIdentificacao: itemEditado ? itemEditado.documento_identificacao : '',
    endereço: itemEditado ? itemEditado.endereço : '',
    empresa: itemEditado ? itemEditado.empresa : '',
    setor: itemEditado ? itemEditado.setor : '',
    comercial: itemEditado ? itemEditado.comercial : '',
    outros: itemEditado ? itemEditado.outros : '',
  });

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '50px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', zIndex: 9999 }}>
      <p style={{ marginBottom: '4px', fontSize: '1rem', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Editar Dados</p>
      <TextField label="Nome" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} fullWidth style={{ marginBottom: '5px' }} />
      <TextField label="Celular" value={formData.celular} onChange={(e) => setFormData({ ...formData, celular: e.target.value })} fullWidth style={{ marginBottom: '5px' }} />
      <TextField label="Documento de Identificação" value={formData.documentoIdentificacao} onChange={(e) => setFormData({ ...formData, documentoIdentificacao: e.target.value })} fullWidth style={{ marginBottom: '5px' }} />
      <TextField label="Endereço" value={formData.endereço} onChange={(e) => setFormData({ ...formData, endereço: e.target.value })} fullWidth style={{ marginBottom: '5px' }} />
      <TextField label="Empresa" value={formData.empresa} onChange={(e) => setFormData({ ...formData, empresa: e.target.value })} fullWidth style={{ marginBottom: '5px' }} />
      <TextField label="Setor" value={formData.setor} onChange={(e) => setFormData({ ...formData, setor: e.target.value })} fullWidth style={{ marginBottom: '5px' }} />
      <TextField label="Telefone Comercial" value={formData.comercial} onChange={(e) => setFormData({ ...formData, comercial: e.target.value })} fullWidth style={{ marginBottom: '5px' }} />
      <TextField label="Outros" value={formData.outros} onChange={(e) => setFormData({ ...formData, outros: e.target.value })} fullWidth style={{ marginBottom: '5px' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" startIcon={<SendIcon />} onClick={handleSave}>Salvar</Button>
        <Button variant="outlined" onClick={onCancel}>Cancelar</Button>
      </div>
    </div>
  );
}

export default FormularioEdicao;
