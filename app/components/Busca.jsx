import React, { useState } from 'react';

function Busca() {
  const [dados, setDados] = useState([]);

  const buscarDados = async (tipo, valor) => {
    try {
      let url = '';
      if (tipo === 'nome') {
        url = `https://call-list-api.onrender.com/person/${valor}`;
      } else if (tipo === 'celular') {
        url = `https://call-list-api.onrender.com/person/celular/${valor}`;
      } else {
        console.error('Tipo de busca inválido:', tipo);
        return;
      }

      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      const response = await fetch(url, requestOptions);
      const result = await response.json();

      setDados(result);
    } catch (error) {
      console.error('Erro ao buscar:', error);
    }
  };

  return { dados, buscarDados };
}

export default Busca;
