import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';      // ← alias
import useCryptoStore from '../Store/CryptoStore';
import React from 'react';

const AppAlert = () => {                         // ← your component
  const { alert, setAlert } = useCryptoStore();

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setAlert({ open: false });
  };

  return (
    <Snackbar
  open={alert.open}
  autoHideDuration={3000}
  onClose={handleClose}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // ⬅️ updated line
>
  <MuiAlert
    onClose={handleClose}
    severity={alert.type}
    elevation={10}
    variant="filled"
  >
    {alert.message}
  </MuiAlert>
</Snackbar>

  );
};

export default AppAlert;
