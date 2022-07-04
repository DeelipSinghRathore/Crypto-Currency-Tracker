import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModel from './Authentication/AuthModel';
import UserSidebar from './Authentication/UserSidebar';
import {
  Select,
  MenuItem,
  AppBar,
  Container,
  Toolbar,
  Typography,
  ThemeProvider,
} from '@material-ui/core';
import { createTheme, makeStyles } from '@material-ui/core/styles';
import { CryptoState } from '../CryptoContext';
const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: 'gold',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
}));
const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    type: 'dark',
  },
});
const Header = () => {
  const classes = useStyles();
  const history = useNavigate();
  const { currency, setCurrency, user } = CryptoState();
  useEffect(() => {
    // console.log(currency);
  }, [currency]);
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography
              onClick={() => history('/')}
              className={classes.title}
              variant='h6'
            >
              Crypto-Bazzar
            </Typography>
            <Select
              variant='outlined'
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'INR'}>INR</MenuItem>
            </Select>
            {user ? <UserSidebar /> : <AuthModel />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
