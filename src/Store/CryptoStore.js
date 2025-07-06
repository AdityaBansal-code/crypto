import { create } from 'zustand';
import axios from 'axios';
import { fetchCoinList } from '../Config/api';
import supabase from '../Config/SupabaseClient';

const useCryptoStore = create((set, get) => ({
  coins: [],
  loading: false,
  currency: 'INR',
  symbol: '₹',
  user: null,
  watchlist: [],
  alert: {
    open: false,
    message: '',
    type: 'success',
  },

  setUser: (user) => set({ user }),
  setAlert: (alert) => set({ alert }),

  setCurrency: (currency) => {
    const symbol =
      currency === 'INR' ? '₹' :
      currency === 'USD' ? '$' :
      currency === 'EUR' ? '€' :
      get().symbol;
    set({ currency, symbol });
  },

  fetchCoins: async () => {
    const { currency } = get();
    set({ loading: true });
    try {
      const data = await fetchCoinList(currency);
      set({ coins: data, loading: false });
    } catch (error) {
      console.error("Error fetching coins:", error);
      set({ loading: false });
    }
  },

  fetchWatchlist: async () => {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;
    if (!userId) return;

    const { data, error } = await supabase
      .from('watchlist')
      .select('coin_ids')
      .eq('user_id', userId)
      .single();

    if (!error && data) {
      set({ watchlist: data.coin_ids || [] });
    } else {
      set({ watchlist: [] });
    }
  },

  toggleWatchlistCoin: async (coinId) => {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;
    if (!userId) return;

    const { watchlist } = get();
    const exists = watchlist.includes(coinId);

    if (exists) {
      const updatedList = watchlist.filter((id) => id !== coinId);
      const { error } = await supabase
        .from('watchlist')
        .update({ coin_ids: updatedList })
        .eq('user_id', userId);

      if (!error) {
        set({ watchlist: updatedList });
      }
    } else {
      const updatedList = [...watchlist, coinId];
      const { data, error } = await supabase
        .from('watchlist')
        .upsert({ user_id: userId, coin_ids: updatedList }, { onConflict: 'user_id' });

      if (!error) {
        set({ watchlist: updatedList });
      }
    }
  },
}));

export default useCryptoStore;
