import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function formatarTelefone(telefone) {
  if (!telefone) return '';
  const cleaned = ('' + telefone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return telefone;
}

function formatarDocumento(documento) {
  if (!documento) return '';
  const cleaned = ('' + documento).replace(/\D/g, '');
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else if (cleaned.length === 14) {
    return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
  return documento;
}

function DadosObtidos({ dados }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (index) => {
    setSelectedItem(selectedItem === index ? null : index);
  };

  return (
    <div className="dados-obtidos">
      {dados.map((item, index) => (
        <div key={index} className="dados-box" style={{ backgroundColor: selectedItem === index ? 'lightblue' : 'white', margin: '10px', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.3s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderBottom: '1px solid #ccc', paddingBottom: '10px' }} onClick={() => handleItemClick(index)}>
            <div>
              <p style={{ marginBottom: '5px' }}><strong>Nome:</strong> {item.nome}</p>
              <p style={{ marginBottom: '5px' }}><strong>Celular:</strong> {formatarTelefone(item.celular)}</p>
            </div>
            <div>
              {selectedItem === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
          </div>
          {selectedItem === index && (
            <div style={{ marginTop: '10px' }}>
              <p style={{ marginBottom: '5px' }}><strong>Documento de Identificação:</strong> {formatarDocumento(item.documento_identificacao)}</p>
              <p style={{ marginBottom: '5px' }}><strong>Endereço:</strong> {item.endereço}</p>
              <p style={{ marginBottom: '5px' }}><strong>Empresa:</strong> {item.empresa}</p>
              <p style={{ marginBottom: '5px' }}><strong>Setor:</strong> {item.setor}</p>
              <p style={{ marginBottom: '5px' }}><strong>Telefone Comercial:</strong> {formatarTelefone(item.comercial)}</p>
              <p style={{ marginBottom: '5px' }}><strong>Outros:</strong> {formatarTelefone(item.outros)}</p>              
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default DadosObtidos;
