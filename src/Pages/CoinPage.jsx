import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCryptoStore from "../Store/CryptoStore";
import CoinInfo from "../Components/CoinInfo";
import { makeStyles } from "tss-react/mui";
import axios from "axios";
import { LinearProgress, Typography, Button } from "@mui/material";
import parse from "html-react-parser";
import { fetchSingleCoin } from "../Config/api";
import { numberWithCommas } from "../Components/Banner/Carousel";
import supabase from "../Config/SupabaseClient";

const useStyles = makeStyles()((theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
    paddingBottom: 20,
  },
  heading: {
    fontWeight: 600,
    fontFamily: "Montserrat",
    fontSize: "2rem",
    marginBottom: 16,
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: "20px 30px",
    textAlign: "justify",
    fontSize: "1rem",
    lineHeight: 1.4,
    marginBottom: 12,
  },
  marketData: {
    width: "100%",
    padding: "0 20px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  dataRow: {
    display: "flex",
    justifyContent: "space-between",
    fontFamily: "Montserrat",
    fontSize: "1.25rem",
    fontWeight: 500,
    color: "gold",
  },
  label: {
    fontFamily: "Montserrat",
    fontWeight: 700,
  },
  value: {
    fontWeight: 500,
    fontSize: "1.25rem",
    color: "white",
  },
}));

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [error, setError] = useState(null);

  const { currency, symbol, user, watchlist, fetchWatchlist } = useCryptoStore();
  const { classes } = useStyles();
  const { setAlert } = useCryptoStore.getState();

  const fetchCoin = async () => {
    try {
      const data = await fetchSingleCoin(id);
      setCoin(data);
    } catch (err) {
      setError("Failed to fetch coin data.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCoin();
  }, [id]);

  const isInWatchlist = watchlist.includes(id);

  const handleWatchlistToggle = async () => {
    const userId = user?.id;
    if (!userId || !coin?.id) return;

    try {
      // Get current coin_ids from watchlist row
      const { data, error } = await supabase
        .from("watchlist")
        .select("coin_ids")
        .eq("user_id", userId)
        .single();

      if (error && error.code !== "PGRST116") throw error; // ignore if row doesn't exist yet

      const currentList = data?.coin_ids || [];

      const updatedList = isInWatchlist
        ? currentList.filter((cid) => cid !== coin.id)
        : [...currentList, coin.id];

      const { error: upsertError } = await supabase
        .from("watchlist")
        .upsert(
          { user_id: userId, coin_ids: updatedList },
          { onConflict: "user_id" }
        );

      if (upsertError) throw upsertError;

      setAlert({
        open: true,
        message: `${coin.name} ${isInWatchlist ? "removed from" : "added to"} watchlist`,
        type: isInWatchlist ? "warning" : "success",
      });

      fetchWatchlist();
    } catch (err) {
      console.error(err);
      setAlert({
        open: true,
        message: "Error updating watchlist",
        type: "error",
      });
    }
  };

  if (error) return <div>{error}</div>;
  if (!coin) return <LinearProgress style={{ backgroundColor: "#000000" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="160"
          width="160"
          style={{ marginBottom: 24, objectFit: "contain" }}
        />

        <Typography className={classes.heading} variant="h5">
          {coin?.name}
        </Typography>

        <Typography variant="subtitle2" className={classes.description}>
          {parse(
            String(
              coin?.description?.en
                ? coin.description.en.split(". ").slice(0, 2).join(". ") + "."
                : ""
            )
          )}
        </Typography>

        <div className={classes.marketData}>
          <div className={classes.dataRow}>
            <span className={classes.label}>Rank:</span>
            <span className={classes.value}>{coin?.market_cap_rank}</span>
          </div>
          <div className={classes.dataRow}>
            <span className={classes.label}>Current Price:</span>
            <span className={classes.value}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data?.current_price[currency.toLowerCase()]
              )}
            </span>
          </div>
          <div className={classes.dataRow}>
            <span className={classes.label}>Market Cap:</span>
            <span className={classes.value}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data?.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}{" "}
              M
            </span>
          </div>

          {user && (
            <Button
              variant="outlined"
              onClick={handleWatchlistToggle}
              style={{
                width: "100%",
                height: "40px",
                backgroundColor: isInWatchlist ? "red" : "#EEBC1D",
                color: isInWatchlist ? "white" : "black",
                marginTop: 25,
                fontFamily: "Montserrat",
              }}
            >
              {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
          )}
        </div>
      </div>

      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
