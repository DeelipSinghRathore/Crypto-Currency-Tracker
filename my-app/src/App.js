import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Homepage';
import CoinPage from './pages/Coinpage.js';
import Header from './components/Header.js';
import {makeStyles} from '@material-ui/core'
import Alert from "./components/Alert"
function App() {

  const useStyles = makeStyles(()=>({
    App:{
      backgroundColor: "#14161a",
      color: "white",
      minHeight: "100vh",
    }
  }));
  const classes = useStyles();
  return (
    <BrowserRouter>
    <div className={classes.App}>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route exact path='/coins/:id' element={<CoinPage />} />
      </Routes>
      </div>
      <Alert/>
    </BrowserRouter>
  );
}

export default App;
