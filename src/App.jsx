import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { makeStyles } from 'tss-react/mui';

import Header from "./Components/Header";
import HomePages from "./Pages/HomePages.jsx"
import CoinPage from "./Pages/CoinPage";
import Alert from "./Components/Alert";

import useCryptoStore from "./Store/CryptoStore";
import supabase from "./Config/SupabaseClient";

const useStyles = makeStyles()(() => ({
  root: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const { classes } = useStyles();
  const setUser = useCryptoStore((state) => state.setUser);
  const fetchWatchlist = useCryptoStore((state) => state.fetchWatchlist);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: session } = await supabase.auth.getSession();
      setUser(session?.session?.user || null);
      fetchWatchlist();
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      fetchWatchlist();
    });

    return () => listener?.subscription?.unsubscribe();
  }, [setUser, fetchWatchlist]);

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </div>
      <Alert />
    </BrowserRouter>
  );
}

export default App;
