import {
    fetchExchangeRatesRequest,
    fetchExchangeRatesSuccess,
    fetchExchangeRatesFailure,
} from './actions';
import { parseExchangeRates } from '../hooks/parseExchangeRates';

// Helper function to check if data is older than a day
const isDataStale = (timestamp) => {
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
    const now = new Date().getTime();
    return now - timestamp > oneDay;
};

export const fetchExchangeRates = () => async (dispatch) => {
    dispatch(fetchExchangeRatesRequest());

    try {
        // Check local storage for cached data
        const cachedData = localStorage.getItem('exchangeRates');
        const cachedTimestamp = localStorage.getItem('exchangeRatesTimestamp');

        if (cachedData && cachedTimestamp && !isDataStale(cachedTimestamp)) {
            // Use cached data if it's not stale
            const parsedRates = JSON.parse(cachedData);
            dispatch(fetchExchangeRatesSuccess(parsedRates));
        } else {
            // Fetch new data if no valid cache is found
            const apiKey = process.env.REACT_APP_API_KEY;
            const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();
            const parsedRates = parseExchangeRates(data);

            // Dispatch success action with new data
            dispatch(fetchExchangeRatesSuccess(parsedRates.ratesArray));

            // Update local storage with new data and timestamp
            localStorage.setItem('exchangeRates', JSON.stringify(parsedRates.ratesArray));
            localStorage.setItem('exchangeRatesTimestamp', new Date().getTime());
        }
    } catch (error) {
        dispatch(fetchExchangeRatesFailure(error.message));
    }
};