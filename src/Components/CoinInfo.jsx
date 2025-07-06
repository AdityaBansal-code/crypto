import React, { useEffect, useState } from "react";
import { fetchHistoricalChart } from "../Config/api";
import useCryptoStore from "../Store/CryptoStore";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";
import { CircularProgress } from "@mui/material";
import { Line } from "react-chartjs-2";
import { chartDays } from "../Config/data";
import SelectButton from "../Components/SelectButton";

// Chart.js Registration
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);

  const { currency } = useCryptoStore();

  const fetchHistoricalData = async () => {
    const data = await fetchHistoricalChart(coin.id, days, currency);
    setHistoricalData(data.prices);
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const useStyles = makeStyles()((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

  const { classes } = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicalData ? (
          <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
        ) : (
          <>
            <Line
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes().toString().padStart(2, "0")} PM`
                      : `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")} AM`;

                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                    fill: false,
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
