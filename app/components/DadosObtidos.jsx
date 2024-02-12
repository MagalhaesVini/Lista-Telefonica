import React from 'react';

function DadosObtidos({ dados }) {
  if (!dados || dados.length === 0) {
    return <p>Nenhum dado disponível.</p>;
  }

  return (
    <div className="dados-obtidos">
      {dados.map((item, index) => (
        <div key={index} className="dados-item">
          <p>Nome: {item.nome}</p>
          <p>Empresa: {item.empresa}</p>
          <p>Setor: {item.setor}</p>
          <p>Celular: {item.celular}</p>
        </div>
      ))}
    </div>
  );
}

export default DadosObtidos;
