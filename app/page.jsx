"use client"

import React, { useState } from 'react';
import IconLabelButtons from './components/IconLabelButtons';
import Formulario from './components/Formulario';
import DadosObtidos from './components/DadosObtidos';
import Busca from './components/Busca';
import './page.module.css'


function Page() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const { dados, buscarDados } = Busca();

  const handleSubmit = async (dadosPessoa) => {
    try {
      const response = await fetch('https://call-list-api.onrender.com/person', {
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
        handleBuscarNomeClick={(nome) => buscarDados('nome', nome)}
        handleBuscarCelularClick={(celular) => buscarDados('celular', celular)}
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
