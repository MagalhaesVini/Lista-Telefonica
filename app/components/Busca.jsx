import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

function Busca({ handleBuscar }) {
  const [termo, setTermo] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleBuscar(termo);
    }
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <TextField id="termo" label="Termo" variant="outlined" sx={{ width: '72%' }} value={termo} onChange={(e) => setTermo(e.target.value)} onKeyPress={handleKeyPress} />
      <Button variant="contained" startIcon={<SearchIcon />} size="large" onClick={() => handleBuscar(termo)}></Button>
    </Stack>
  );
}

export default Busca;
