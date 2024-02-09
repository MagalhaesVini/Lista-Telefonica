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

export default function IconLabelButtons() {
  const [mostrarFormulario, setMostrarFormulario] = React.useState(false);
  const [nome, setNome] = React.useState('');
  const [celular, setCelular] = React.useState('');
  const [dados, setDados] = React.useState([]);
  const [documentoIdentificacao, setDocumentoIdentificacao] = React.useState('');
  const [empresa, setEmpresa] = React.useState('');
  const [setor, setSetor] = React.useState('');
  const [endereco, setEndereco] = React.useState('');
  const [comercial, setComercial] = React.useState('');
  const [outros, setOutros] = React.useState('');

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
        limparInputs();
      })
      .catch(error => console.error('Erro ao buscar por nome:', error));
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
        limparInputs();
      })
      .catch(error => console.error('Erro ao buscar por celular:', error));
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

  const handleAbrirFormulario = () => {
    setMostrarFormulario(true);
  };

  const handleFecharFormulario = () => {
    setMostrarFormulario(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dadosPessoa = {
      nome,
      documento_identificacao: parseInt(documentoIdentificacao),
      empresa,
      setor,
      endereco,
      comercial: parseInt(comercial),
      celular: parseInt(celular),
      outros: parseInt(outros)
    };

    try {
      const response = await fetch('https://call-list-api-development.up.railway.app/person', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosPessoa)
      });

      if (response.ok) {
        // A pessoa foi criada com sucesso, você pode fazer algo aqui, como fechar o formulário
        setMostrarFormulario(false);
      } else {
        // Se a requisição falhou, você pode lidar com o erro aqui
        console.error('Erro ao criar pessoa:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao criar pessoa:', error.message);
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
          <TextField id="nome" label="Nome" variant="outlined" sx={{ width: '72%' }} value={nome} onChange={(e) => setNome(e.target.value)} onKeyPress={handleKeyPress} />
          <TextField id="celular" label="Celular" variant="outlined" sx={{ width: '14%' }} inputProps={{ maxLength: 11 }} value={celular} onChange={(e) => setCelular(e.target.value)} onKeyPress={handleCelularKeyPress} />
          <Button variant="contained" startIcon={<SearchIcon />} size="large" onClick={handleBuscarNomeClick}></Button>
          <Button variant="contained" size='large' startIcon={<AddIcon />} onClick={handleAbrirFormulario}></Button>
        </Stack>

      </Box>
      {mostrarFormulario && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
          <form onSubmit={handleSubmit}>
            <Stack direction="column" spacing={2}>
              <TextField label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
              <TextField label="Documento Identificação" value={documentoIdentificacao} onChange={(e) => setDocumentoIdentificacao(e.target.value)} />
              <TextField label="Empresa" value={empresa} onChange={(e) => setEmpresa(e.target.value)} />
              <TextField label="Setor" value={setor} onChange={(e) => setSetor(e.target.value)} />
              <TextField label="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
              <TextField label="Comercial" value={comercial} onChange={(e) => setComercial(e.target.value)} />
              <TextField label="Celular" value={celular} onChange={(e) => setCelular(e.target.value)} />
              <TextField label="Outros" value={outros} onChange={(e) => setOutros(e.target.value)} />
              <Button type="submit" variant="contained" startIcon={<SendIcon />}>Enviar</Button>
              <Button variant="outlined" onClick={handleFecharFormulario}>Cancelar</Button>
            </Stack>
          </form>
        </div>
      )}
      {dados.length > 0 && (
        <div>
          {dados.map((item, index) => (
            <div key={index}>
              <p>Nome: {item.nome}</p>
              <p>Empresa: {item.empresa}</p>
              <p>Setor: {item.setor}</p>
              <p>Celular: {item.celular}</p>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button variant="outlined" size='normal' startIcon={<DeleteIcon />}>Excluir</Button>
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
