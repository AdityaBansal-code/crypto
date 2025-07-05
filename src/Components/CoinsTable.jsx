import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  LinearProgress,
  Pagination,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";
import { CoinList } from "../Config/api";
import useCryptoStore from "../Store/CryptoStore";
import { numberWithCommas } from "./Banner/Carousel";

const useStyles = makeStyles()(() => ({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
}));

const CoinsTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol, coins, loading, fetchCoins } = useCryptoStore();
  const navigate = useNavigate();
  const { classes } = useStyles();

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredCoins = handleSearch();
  const paginatedCoins = filteredCoins.slice((page - 1) * 10, page * 10);

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 20, fontFamily: "Montserrat" }}
        >
          Crypto Currencies Prices by Market Cap
        </Typography>

        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <Box sx={{ overflowX: "auto" }}>
          <TableContainer component={Paper}>
            {loading ? (
              <LinearProgress style={{ backgroundColor: "gold" }} />
            ) : (
              <Table aria-label="simple table">
                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                  <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                      <TableCell
                        key={head}
                        align={head === "Coin" ? "left" : "right"}
                        style={{
                          color: "black",
                          fontWeight: "700",
                          fontFamily: "Montserrat",
                          minWidth: 120,
                        }}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {paginatedCoins.map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        key={row.name}
                        className={classes.row}
                        onClick={() => navigate(`/coins/${row.id}`)}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={row.image}
                            alt={row.name}
                            height="40"
                            width="40"
                            style={{
                              objectFit: "contain",
                              marginBottom: 6,
                            }}
                          />
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 18,
                                fontWeight: 600,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey", fontSize: 14 }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell align="right">
                          {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>

                        <TableCell
                          align="right"
                          style={{
                            color: profit ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>

                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Box>

        <Pagination
          count={Math.ceil(filteredCoins.length / 10)}
          page={page}
          onChange={(_, value) => {
            setPage(value);
            window.scrollTo({ top: 450, behavior: "smooth" });
          }}
          classes={{ ul: classes.pagination }}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
