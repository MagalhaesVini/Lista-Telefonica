import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

function IconLabelButtons({ handleBuscarNomeClick, handleBuscarCelularClick, handleAbrirFormulario }) {
  const [nome, setNome] = useState('');
  const [celular, setCelular] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleBuscarNomeClick(nome);
    }
  };

  const handleCelularKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleBuscarCelularClick(celular);
    }
  };

  const handleSearchClick = () => {
    handleBuscarNomeClick(nome);
  };

  return (
    <div className="search-bar">
      <Stack direction="row" alignItems="center" spacing={2}>
        <TextField
          id="nome"
          label="Nome"
          variant="outlined"
          sx={{ width: '72%' }}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <TextField
          id="celular"
          label="Celular"
          variant="outlined"
          sx={{ width: '14%' }}
          inputProps={{ maxLength: 11 }}
          value={celular}
          onChange={(e) => setCelular(e.target.value)}
          onKeyPress={handleCelularKeyPress}
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
