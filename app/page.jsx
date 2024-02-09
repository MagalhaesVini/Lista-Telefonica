"use client"

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import { Input } from '@mui/material';

export default function IconLabelButtons() {
  const [nome, setNome] = React.useState('');
  const [celular, setCelular] = React.useState('');
  const [dados, setDados] = React.useState(null);

  const handleBuscarNomeClick = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`https://call-list-api-development.up.railway.app/person/${nome}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('Dados recebidos:', result);
        setDados(result);
      })
      .catch(error => console.error('Erro ao buscar por nome:', error));

    limparInputs();
  };

  const handleBuscarCelularClick = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`https://call-list-api-development.up.railway.app/person/celular/${celular}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('Dados recebidos:', result);
        setDados(result);
      })
      .catch(error => console.error('Erro ao buscar por celular:', error));

    limparInputs();
  };

  const limparInputs = () => {
    setNome('');
    setCelular('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleBuscarNomeClick();
    }
  };

  const handleCelularKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleBuscarCelularClick();
    }
  };

  return (
    <div style={{ width: '80%', padding: '20px', margin: '20px 0', backgroundColor: '#f0f0f0', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 2 },
        }}
        noValidate
        autoComplete="off"
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <TextField id="outlined-basic" label="Nome" variant="outlined" sx={{ width: '72%' }} value={nome} onChange={(e) => setNome(e.target.value)} onKeyPress={handleKeyPress} />
          <TextField id="outlined-basic" label="Celular" variant="outlined" sx={{ width: '14%' }} inputProps={{ maxLength: 11 }} value={celular} onChange={(e) => setCelular(e.target.value)} onKeyPress={handleCelularKeyPress} />
          <Button variant="contained" startIcon={<SearchIcon />} size="large" onClick={handleBuscarNomeClick}></Button>
          <Fab color="primary" size='small' aria-label="add"><AddIcon /></Fab>
        </Stack>
      </Box>
      {dados && (
        <div>
          <p>Nome: {dados.nome}</p>
          <p>Empresa: {dados.empresa}</p>
          <p>Setor: {dados.setor}</p>
          <p>Celular: {dados.celular}</p>
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button variant="outlined" size='normal' startIcon={<DeleteIcon />}></Button>
          <Fab color="secondary" aria-label="edit" size='small' style={{ marginLeft: 8 }}>
            <EditIcon />
          </Fab>
        </div>
        <Button variant="contained" endIcon={<SendIcon />}>
          Enviar
        </Button>
      </div>

    </div>
  );
}
