import AppBar from '@mui/material/AppBar'
import React from 'react'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { makeStyles } from 'tss-react/mui';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useCryptoStore from '../Store/CryptoStore';
import AuthModal from './Autherentication/AuthModal';
import UserSidebar from './Autherentication/UserSidebar';



const useStyles = makeStyles()((theme) => {
  return {
    title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
  };
});





const Header = () => {

  const {classes} = useStyles();
  const navigate = useNavigate();
  const { currency, setCurrency, symbol, user } = useCryptoStore();
  console.log(currency);
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#fff',
      },
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar position='static' color='transparent'>
      <Container>
        
        <Toolbar>
          <Typography onClick={() => navigate('/')} variant="h6" className={classes.title}>Crypto Tracker</Typography>
          <Select variant="outlined" style={{width: 100, height: 40, marginRight: 15}} value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="INR">INR</MenuItem>
          </Select>
          {user ? <UserSidebar /> : <AuthModal />}
        </Toolbar>
        
      </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header