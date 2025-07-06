import React, { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { fetchTrendingCoins } from "../../Config/api";
import useCryptoStore from "../../Store/CryptoStore";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const useStyles = makeStyles()((theme) => {
  return {
    carousel: {
      height: "150px", // smaller height
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
      padding: "0 10px",
      justifyContent: "center",
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
      width: "60%",
      margin: "0 6px",
      textAlign: "center",
      justifyContent: "center",
      padding : "10px",
      paddingLeft : "50px",
      paddingTop : "0px"
    },
  };
});

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { classes } = useStyles();

  const { currency } = useCryptoStore();
  const { symbol } = useCryptoStore();

  const getTrendingCoins = async () => {
    const data = await fetchTrendingCoins(currency);
    setTrending(data);
  };

  useEffect(() => {
    getTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    const profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link
        key={coin.id}
        className={classes.carouselItem}
        to={`/coins/${coin.id}`}
      >
        <img
          src={coin.image}
          alt={coin.name}
          height="50" // reduced size
          style={{ marginBottom: 6, objectFit: "contain" }}
        />
        <span style={{ fontSize: 10 }}>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
              fontSize: 10,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 14, fontWeight: 500 }}>
          {symbol}
          {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
