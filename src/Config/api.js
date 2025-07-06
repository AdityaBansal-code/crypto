import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";
const DEMO_API_KEY = "CG-sdEm6uZtePSVvWzTXqgNnfwa";

// Create axios instance with default config
const coinGeckoAPI = axios.create({
  baseURL: BASE_URL,
});

// API functions using axios
export const fetchCoinList = async (currency = "usd") => {
  try {
    const response = await coinGeckoAPI.get("/coins/markets", {
      params: {
        vs_currency: currency,
        order: "market_cap_desc",
        per_page: 100,
        page: 1,
        sparkline: false,
        x_cg_demo_api_key: DEMO_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching coin list:", error);
    throw error;
  }
};

export const fetchSingleCoin = async (id) => {
  try {
    const response = await coinGeckoAPI.get(`/coins/${id}`, {
      params: {
        x_cg_demo_api_key: DEMO_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching single coin:", error);
    throw error;
  }
};

export const fetchHistoricalChart = async (id, days = 365, currency = "usd") => {
  try {
    const response = await coinGeckoAPI.get(`/coins/${id}/market_chart`, {
      params: {
        vs_currency: currency,
        days: days,
        x_cg_demo_api_key: DEMO_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching historical chart:", error);
    throw error;
  }
};

export const fetchTrendingCoins = async (currency = "usd") => {
  try {
    const response = await coinGeckoAPI.get("/coins/markets", {
      params: {
        vs_currency: currency,
        order: "gecko_desc",
        per_page: 10,
        page: 1,
        sparkline: false,
        price_change_percentage: "24h",
        x_cg_demo_api_key: DEMO_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching trending coins:", error);
    throw error;
  }
};

// Legacy URL exports for backward compatibility (if needed)
export const CoinList = (currency) =>
  `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (id) => `${BASE_URL}/coins/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `${BASE_URL}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency) =>
  `${BASE_URL}/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;