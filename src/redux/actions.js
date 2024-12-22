export const FETCH_EXCHANGE_RATES_REQUEST = 'FETCH_EXCHANGE_RATES_REQUEST';
export const FETCH_EXCHANGE_RATES_SUCCESS = 'FETCH_EXCHANGE_RATES_SUCCESS';
export const FETCH_EXCHANGE_RATES_FAILURE = 'FETCH_EXCHANGE_RATES_FAILURE';
export const SET_SELL_CURRENCY = 'SET_SELL_CURRENCY';
export const SET_BUY_CURRENCY = 'SET_BUY_CURRENCY';

export const fetchExchangeRatesRequest = () => ({
    type: FETCH_EXCHANGE_RATES_REQUEST,
});

export const fetchExchangeRatesSuccess = (rates) => ({
    type: FETCH_EXCHANGE_RATES_SUCCESS,
    payload: rates,
});

export const fetchExchangeRatesFailure = (error) => ({
    type: FETCH_EXCHANGE_RATES_FAILURE,
    payload: error,
});

export const setSellCurrency = (currency) => ({
    type: SET_SELL_CURRENCY,
    payload: currency,
});

export const setBuyCurrency = (currency) => ({
    type: SET_BUY_CURRENCY,
    payload: currency,
});
