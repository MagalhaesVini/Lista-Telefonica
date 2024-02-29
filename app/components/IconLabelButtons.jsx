import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

function formatarCelular(numero) {
  if (!numero) return '';
  
  const apenasDigitos = numero.replace(/[^\d]/g, '');
  
  const match = apenasDigitos.match(/^(\d{2})(\d{1})(\d{4})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]} ${match[3]}-${match[4]}`;
  }
  
  return numero;
}

function IconLabelButtons({ handleBuscarNomeClick, handleBuscarCelularClick, handleAbrirFormulario }) {
  const [nome, setNome] = useState('');
  const [celular, setCelular] = useState('');
  const [tipoBusca, setTipoBusca] = useState('nome');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (tipoBusca === 'nome') {
        handleBuscarNomeClick(nome);
      } else {
        handleBuscarCelularClick(celular.replace(/[^\d]/g, ''));
      }
      setNome('');
      setCelular('');
      setTipoBusca('nome');
    }
  };

  const handleSearchClick = () => {
    if (tipoBusca === 'nome') {
      handleBuscarNomeClick(nome);
    } else {
      handleBuscarCelularClick(celular.replace(/[^\d]/g, ''));
    }
    setNome('');
    setCelular('');
    setTipoBusca('nome');
  };

  return (
    <div className="search-bar">
      <Stack direction="row" alignItems="center" spacing={2}>
        <TextField
          id="nome"
          label="Nome"
          variant="outlined"
          sx={{ width: '50%', backdropFilter: 'blur(2px)', }}
          value={nome}
          onChange={(e) => {setNome(e.target.value); setTipoBusca('nome');}}
          onKeyPress={handleKeyPress}
        />
        <TextField
          id="celular"
          label="Celular"
          variant="outlined"
          sx={{ width: '20%', backdropFilter: 'blur(2px)',   }}
          inputProps={{ maxLength: 15 }}
          value={formatarCelular(celular)}
          onChange={(e) => {setCelular(e.target.value); setTipoBusca('celular');}}
          onKeyPress={handleKeyPress}
        />
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          size="large"
          onClick={handleSearchClick}
        >
          Buscar
        </Button>
        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={handleAbrirFormulario}
        >
          Adicionar
        </Button>
      </Stack>
    </div>
  );
}

export default IconLabelButtons;
