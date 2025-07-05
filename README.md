# Crypto Tracker

A modern cryptocurrency tracking application built with React, featuring real-time price data, user authentication, watchlists, and interactive charts.

## 🚀 Features

- **Real-time Crypto Data**: Live cryptocurrency prices and market data from CoinGecko API
- **User Authentication**: Secure login/signup with Supabase authentication
- **Watchlist Management**: Add/remove cryptocurrencies to your personal watchlist with persistent storage
- **Interactive Charts**: Visualize price trends with Chart.js and multiple timeframes
- **Responsive Design**: Modern UI built with Material-UI and Tailwind CSS
- **Search & Filter**: Find cryptocurrencies quickly with real-time search functionality
- **Detailed Coin Pages**: Comprehensive information including market data, charts, and descriptions
- **Alert System**: User-friendly notifications for actions and errors
- **Carousel Banner**: Dynamic banner with trending cryptocurrencies

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite (for fast development and building)
- **Styling**: Material-UI (components), Tailwind CSS (utility classes), TSS React (styled components)
- **State Management**: Zustand (lightweight state management)
- **Authentication**: Supabase (backend-as-a-service)
- **Charts**: Chart.js, React Chart.js 2 (interactive data visualization)
- **Routing**: React Router DOM (client-side routing)
- **HTTP Client**: Axios (API requests)
- **Carousel**: React Alice Carousel (banner slideshow)
- **HTML Parsing**: html-react-parser (for rendering HTML content)


The app will be available at `https://crypto-omega-topaz.vercel.app/3`

## 🎯 Usage

### Home Page
- View trending cryptocurrencies in the banner carousel
- Browse all available cryptocurrencies in a sortable table
- Search for specific coins using the search bar
- Filter coins by various criteria
- Add coins to your watchlist (requires authentication)

### Coin Details Page
- Access by clicking on any cryptocurrency
- View detailed price information and market data
- Interactive price charts with multiple timeframes
- Historical price data visualization
- Coin description and additional information

### Authentication
- Sign up with email and password
- Login to access personalized features
- Secure session management
- Automatic logout on session expiry

### Watchlist
- Add/remove cryptocurrencies to your personal watchlist
- Persistent storage across sessions
- Quick access to your favorite coins
- Real-time price updates for watchlisted coins

## 📁 Project Structure

```
src/
├── Components/              # Reusable UI components
│   ├── Alert.jsx           # Global alert notifications
│   ├── Authentication/     # Auth-related components
│   │   ├── AuthModal.jsx   # Login/Signup modal
│   │   ├── Login.jsx       # Login form component
│   │   ├── Signup.jsx      # Signup form component
│   │   └── UserSidebar.jsx # User profile sidebar
│   ├── Banner/             # Banner and carousel components
│   │   ├── Banner.jsx      # Main banner component
│   │   └── Carousel.jsx    # Carousel for trending coins
│   ├── CoinInfo.jsx        # Individual coin information display
│   ├── CoinsTable.jsx      # Table displaying all cryptocurrencies
│   ├── Header.jsx          # Main navigation header
│   └── SelectButton.jsx    # Reusable select button component
├── Config/                 # Configuration files
│   ├── api.js             # API endpoints and configuration
│   ├── AuthServices.js    # Authentication service functions
│   ├── config.js          # General app configuration
│   ├── data.js            # Static data and constants
│   └── SupabaseClient.js  # Supabase client setup
├── Pages/                  # Page components
│   ├── HomePage.jsx       # Main dashboard page
│   └── CoinPage.jsx       # Individual coin details page
├── Store/                  # State management
│   └── CryptoStore.js     # Zustand store for app state
├── App.jsx                 # Main app component
├── main.jsx               # App entry point
└── index.css              # Global styles
```

## 🔧 Configuration Files

- `vite.config.js` - Vite bundler configuration
- `tailwind.config.js` - Tailwind CSS utility classes configuration
- `eslint.config.js` - ESLint code quality rules
- `postcss.config.js` - PostCSS processing configuration
- `supabase.js` - Supabase client configuration

## 🚀 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## 📱 Features in Detail

### Authentication System
- **Supabase Integration**: Secure user authentication with email/password
- **Session Management**: Automatic session handling and persistence
- **Protected Features**: Watchlist and user-specific data require authentication
- **Auth State**: Global auth state management with Zustand

### Real-time Data Integration
- **CoinGecko API**: Fetches live cryptocurrency data
- **Price Updates**: Real-time price information and market data
- **Market Metrics**: Market cap, volume, price change percentages
- **Trending Coins**: Dynamic trending cryptocurrency data

### Interactive Charts
- **Chart.js Integration**: Professional chart visualization
- **Multiple Timeframes**: Daily, weekly, monthly, yearly views
- **Responsive Design**: Charts adapt to different screen sizes
- **Price History**: Historical price data visualization

### Watchlist Management
- **Supabase Database**: Persistent storage of user watchlists
- **Real-time Sync**: Automatic synchronization across sessions
- **Add/Remove**: Easy management of watchlisted coins
- **Quick Access**: Dedicated section for watchlisted cryptocurrencies

### UI/UX Features
- **Material-UI Components**: Professional, accessible UI components
- **Tailwind CSS**: Utility-first styling for custom designs
- **Responsive Layout**: Works seamlessly on desktop and mobile
- **Dark Theme**: Modern dark theme for better user experience
- **Loading States**: Smooth loading indicators and transitions

## 🔌 API Integration

The app integrates with:
- **CoinGecko API**: For cryptocurrency market data
- **Supabase**: For authentication and database storage

### API Endpoints Used
- CoinGecko: `/api/v3/coins/markets` - Market data
- CoinGecko: `/api/v3/coins/{id}` - Individual coin details
- CoinGecko: `/api/v3/coins/{id}/market_chart` - Price history
- Supabase: Authentication and user data storage

## 🗄️ Database Schema

### Users Table (Supabase Auth)
- `id` - User unique identifier
- `email` - User email address
- `created_at` - Account creation timestamp

### Watchlist Table
- `id` - Watchlist entry ID
- `user_id` - Reference to user
- `coin_id` - Cryptocurrency identifier
- `created_at` - Entry creation timestamp

## 🚨 Troubleshooting

### Common Issues

1. **Environment Variables Not Working**
   - Ensure `.env` file is in the root directory
   - Restart the development server after adding variables
   - Check that variable names start with `VITE_`

2. **Authentication Issues**
   - Verify Supabase credentials in `.env`
   - Check Supabase project settings
   - Clear browser cache and cookies

3. **API Rate Limiting**
   - CoinGecko has rate limits for free tier
   - Implement caching if needed
   - Consider upgrading to paid API plan

4. **Build Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check for version conflicts in package.json
   - Clear node_modules and reinstall if needed



## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [React](https://reactjs.org/) - Frontend framework
- [Vite](https://vitejs.dev/) - Build tool and dev server
- [Material-UI](https://mui.com/) - UI component library
- [Supabase](https://supabase.com/) - Backend-as-a-service
- [Chart.js](https://www.chartjs.org/) - Chart library
- [CoinGecko API](https://www.coingecko.com/en/api) - Cryptocurrency data
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Zustand](https://github.com/pmndrs/zustand) - State management

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Search existing issues in the repository
3. Create a new issue with detailed information
4. Include error messages and steps to reproduce
