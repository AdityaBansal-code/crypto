import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import useCryptoStore from '../../Store/CryptoStore';
import { Avatar } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { signOut } from '../../Config/AuthServices';
import { useNavigate } from 'react-router-dom';
import supabase from '../../Config/SupabaseClient';
import { numberWithCommas } from '../Banner/Carousel';
import { useState } from 'react';

export default function UserSidebar() {
  const [state, setState] = useState({ right: false });
  const { user, watchlist, coins, fetchWatchlist, symbol, setAlert, setUser } = useCryptoStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) fetchWatchlist();
  }, [user, fetchWatchlist]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setState({ ...state, [anchor]: open });
  };

  const logout = async () => {
    await signOut();
    setUser(null);
    setAlert({
      open: true,
      message: "Logged out successfully",
      type: "success",
    });
    setState({ right: false });
  };

  const handleRemove = async (coinId) => {
    const userId = user?.id;
    if (!userId) return;
  
    try {
      const { data, error } = await supabase
        .from("watchlist")
        .select("coin_ids")
        .eq("user_id", userId)
        .single();
  
      if (error || !data) return;
  
      const updatedList = (data.coin_ids || []).filter((id) => id !== coinId);
  
      await supabase
        .from("watchlist")
        .update({ coin_ids: updatedList })
        .eq("user_id", userId);
  
      setAlert({
        open: true,
        message: "Removed from Watchlist",
        type: "info",
      });
  
      fetchWatchlist();
    } catch (err) {
      setAlert({
        open: true,
        message: "Failed to update watchlist",
        type: "error",
      });
      console.error("Error removing coin from watchlist:", err);
    }
  };
  const watchlistCoins = coins.filter(coin => watchlist.includes(coin.id));

  const useStyles = makeStyles()(() => ({
    container: {
      width: 350,
      padding: 25,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      fontFamily: "monospace",
    },
    profile: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
      height: "92%",
    },
    logout: {
      height: "8%",
      width: "100%",
      backgroundColor: "#EEBC1D",
      marginTop: 20,
      color: "black",
    },
    picture: {
      width: 200,
      height: 200,
      cursor: "pointer",
      backgroundColor: "#EEBC1D",
      objectFit: "contain",
    },
    watchlist: {
      flex: 1,
      width: "100%",
      backgroundColor: "grey",
      borderRadius: 10,
      padding: 15,
      paddingTop: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
      overflowY: "scroll",
    },
    coin: {
      padding: 10,
      borderRadius: 5,
      color: "black",
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#EEBC1D",
      boxShadow: "0 0 3px black",
    },
    name: {
      width: "100%",
      fontSize: 18,
      textAlign: "center",
      fontWeight: "bolder",
      wordWrap: "break-word",
      marginTop: 10,
    },
  }));
  const { classes } = useStyles();

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            sx={{
              width: 38,
              height: 38,
              marginLeft: 1,
              cursor: 'pointer',
              backgroundColor: '#EEBC1D',
            }}
            src={user.user_metadata.avatar_url}
            alt={user.user_metadata.name || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className={classes.container}>
              <div className={classes.profile}>
                <Avatar
                  className={classes.picture}
                  src={user.user_metadata.avatar_url}
                  alt={user.user_metadata.name || user.email}
                />
                <span className={classes.name}>
                  {user.user_metadata.name || user.email}
                </span>

                <div className={classes.watchlist}>
                  <span style={{ fontSize: 15, textShadow: "0 0 3px black", fontWeight: "bolder" }}>
                    Watchlist
                  </span>

                  {watchlistCoins.length === 0 ? (
                    <span style={{ color: "white", fontSize: 12 }}>
                      No coins in watchlist
                    </span>
                  ) : (
                    watchlistCoins.map((coin) => (
                      <div key={coin.id} className={classes.coin}>
                        <span
                          style={{ fontWeight: 600, cursor: "pointer" }}
                          onClick={() => {
                            navigate(`/coins/${coin.id}`);
                            setState({ right: false });
                          }}
                        >
                          {coin.name} - {symbol}{" "}
                          {numberWithCommas(coin.current_price.toFixed(2))}
                        </span>
                        <Button
                          onClick={() => handleRemove(coin.id)}
                          style={{
                            marginLeft: 10,
                            
                            color: "red",
                            minWidth: 32,
                          }}
                        >
                          X
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <Button className={classes.logout} onClick={logout}>
                Logout
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
