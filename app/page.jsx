"use client"

import React, { useState } from 'react';
import IconLabelButtons from './components/IconLabelButtons';
import Formulario from './components/Formulario';
import DadosObtidos from './components/DadosObtidos';

function Page() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [dados, setDados] = useState([]);

  const handleBuscar = async (tipo, valor) => {
    try {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      let url = '';
      if (tipo === 'nome') {
        url = `https://call-list-api-development.up.railway.app/person/${valor}`;
      } else if (tipo === 'celular') {
        url = `https://call-list-api-development.up.railway.app/person/celular/${valor}`;
      } else {
        console.error('Tipo de busca inválido:', tipo);
        return;
      }

      const response = await fetch(url, requestOptions);
      const result = await response.json();

      setDados(result);
    } catch (error) {
      console.error('Erro ao buscar:', error);
    }
  };

  const handleSubmit = async (dadosPessoa) => {
    try {
      const response = await fetch('https://call-list-api-development.up.railway.app/person', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosPessoa)
      });

      if (response.ok) {
        setMostrarFormulario(false);
      } else {
        console.error('Erro ao criar pessoa:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao criar pessoa:', error.message);
    }
  };

  return (
    <div>
      <IconLabelButtons
        handleBuscarNomeClick={(nome) => handleBuscar('nome', nome)}
        handleBuscarCelularClick={(celular) => handleBuscar('celular', celular)}
        handleAbrirFormulario={() => setMostrarFormulario(true)}
      />
      {mostrarFormulario && (
        <Formulario
          handleSubmit={handleSubmit}
          handleFecharFormulario={() => setMostrarFormulario(false)}
        />
      )}
      <DadosObtidos dados={dados} />
    </div>
  );
}

export default Page;
