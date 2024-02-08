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
          <TextField id="outlined-basic" label="Nome" variant="outlined" sx={{ width: '66%' }} />
          <TextField id="outlined-basic" label="Celular" variant="outlined" sx={{ width: '12%' }} inputProps={{ maxLength: 12 }} />
          <Button variant="contained" startIcon={<SearchIcon />} size="large">Buscar</Button>
          <Fab color="primary" aria-label="add"><AddIcon /></Fab>
        </Stack>
      </Box>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end" marginTop={2}>
        <Fab color="secondary" aria-label="edit" size='small'><EditIcon /></Fab>
        <Button variant="contained" endIcon={<SendIcon />}>
          Enviar
        </Button>
        <Button variant="outlined" startIcon={<DeleteIcon />}>
          Excluir
        </Button>
      </Stack>
    </div>
  );
}
