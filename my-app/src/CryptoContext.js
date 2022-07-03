import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CoinList } from './config/api';
import { onAuthStateChanged } from "firebase/auth";
import {auth,db} from "./firebase"
import { onSnapshot, doc } from "firebase/firestore";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState('INR');
  const [symbol, setSymbol] = useState('₹');
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    type: 'success',
  });
 const [watchlist,setWatchlist]=useState([]);
 useEffect(()=>{
   if(user){
    const coinref = doc(db,"watchlist",user.uid);
    const unsubscribe = onSnapshot(coinref,coin=>{
      if(coin.exists()){
        setWatchlist(coin.data().coins);
      }
    })
    return ()=>{
      unsubscribe();
    }
   }
 },[user])
  useEffect(()=>{
    onAuthStateChanged(auth,user=>{
      if(user)setUser(user);
      else setUser(null);
    })
  },[])

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    if (currency === 'INR') setSymbol('₹');
    else if (currency === 'USD') setSymbol('$');
  }, [currency]);

  return (
    <Crypto.Provider
      value={{ currency, setCurrency, symbol, coins, loading, fetchCoins,alert,setAlert,user,watchlist }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
