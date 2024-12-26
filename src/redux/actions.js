export const FETCH_EXCHANGE_RATES_REQUEST = 'FETCH_EXCHANGE_RATES_REQUEST';
export const FETCH_EXCHANGE_RATES_SUCCESS = 'FETCH_EXCHANGE_RATES_SUCCESS';
export const FETCH_EXCHANGE_RATES_FAILURE = 'FETCH_EXCHANGE_RATES_FAILURE';
export const SET_SELL_CURRENCY = 'SET_SELL_CURRENCY';
export const SET_BUY_CURRENCY = 'SET_BUY_CURRENCY';
export const SET_SELL_AMOUNT = 'SET_SELL_AMOUNT';
export const SET_BUY_AMOUNT = 'SET_BUY_AMOUNT';
export const SET_IS_EDITING_SELL = 'SET_IS_EDITING_SELL';
export const SET_IS_EDITING_BUY = 'SET_IS_EDITING_BUY';
export const SWAP_CURRENCIES = 'SWAP_CURRENCIES';

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

export const setSellCurrency = (currencyCode) => ({
    type: SET_SELL_CURRENCY,
    payload: currencyCode,
});

export const setBuyCurrency = (currencyCode) => ({
    type: SET_BUY_CURRENCY,
    payload: currencyCode,
});

export const setSellAmount = (amount) => ({
    type: SET_SELL_AMOUNT,
    payload: amount,
});

export const setBuyAmount = (amount) => ({
    type: SET_BUY_AMOUNT,
    payload: amount,
});

export const setIsEditingSell = (isEditing) => ({
    type: SET_IS_EDITING_SELL,
    payload: isEditing,
});

export const setIsEditingBuy = (isEditing) => ({
    type: SET_IS_EDITING_BUY,
    payload: isEditing,
});

export const swapCurrencies = () => ({
    type: SWAP_CURRENCIES,
});
