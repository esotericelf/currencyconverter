import { configureStore } from '@reduxjs/toolkit';
import exchangeRatesReducer from './reducers';

const store = configureStore({
    reducer: exchangeRatesReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
