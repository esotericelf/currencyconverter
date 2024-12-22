import {
    fetchExchangeRatesRequest,
    fetchExchangeRatesSuccess,
    fetchExchangeRatesFailure,
} from './actions';
import { parseExchangeRates } from '../hooks/parseExchangeRates';

export const fetchExchangeRates = () => async (dispatch) => {
    dispatch(fetchExchangeRatesRequest());
    try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        const parsedRates = parseExchangeRates(data);
        dispatch(fetchExchangeRatesSuccess(parsedRates.ratesArray));
    } catch (error) {
        dispatch(fetchExchangeRatesFailure(error.message));
    }
};