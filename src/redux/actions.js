// Action Types
export const ActionTypes = {
    FETCH_EXCHANGE_RATES_REQUEST: 'FETCH_EXCHANGE_RATES_REQUEST',
    FETCH_EXCHANGE_RATES_SUCCESS: 'FETCH_EXCHANGE_RATES_SUCCESS',
    FETCH_EXCHANGE_RATES_FAILURE: 'FETCH_EXCHANGE_RATES_FAILURE',
    SET_SELL_CURRENCY: 'SET_SELL_CURRENCY',
    SET_BUY_CURRENCY: 'SET_BUY_CURRENCY',
    SET_SELL_AMOUNT: 'SET_SELL_AMOUNT',
    SET_BUY_AMOUNT: 'SET_BUY_AMOUNT',
    SET_IS_EDITING_SELL: 'SET_IS_EDITING_SELL',
    SET_IS_EDITING_BUY: 'SET_IS_EDITING_BUY',
    SWAP_CURRENCIES: 'SWAP_CURRENCIES',
    TOGGLE_MENU: 'TOGGLE_MENU',
};

// Action Creators
export const fetchExchangeRatesRequest = () => ({
    type: ActionTypes.FETCH_EXCHANGE_RATES_REQUEST,
});

export const fetchExchangeRatesSuccess = (rates) => ({
    type: ActionTypes.FETCH_EXCHANGE_RATES_SUCCESS,
    payload: rates,
});

export const fetchExchangeRatesFailure = (error) => ({
    type: ActionTypes.FETCH_EXCHANGE_RATES_FAILURE,
    payload: error,
});

export const setSellCurrency = (currencyCode) => ({
    type: ActionTypes.SET_SELL_CURRENCY,
    payload: currencyCode,
});

export const setBuyCurrency = (currencyCode) => ({
    type: ActionTypes.SET_BUY_CURRENCY,
    payload: currencyCode,
});

export const setSellAmount = (amount) => ({
    type: ActionTypes.SET_SELL_AMOUNT,
    payload: amount,
});

export const setBuyAmount = (amount) => ({
    type: ActionTypes.SET_BUY_AMOUNT,
    payload: amount,
});

export const setIsEditingSell = (isEditing) => ({
    type: ActionTypes.SET_IS_EDITING_SELL,
    payload: isEditing,
});

export const setIsEditingBuy = (isEditing) => ({
    type: ActionTypes.SET_IS_EDITING_BUY,
    payload: isEditing,
});

export const swapCurrencies = () => ({
    type: ActionTypes.SWAP_CURRENCIES,
});

export const toggleMenu = () => ({
    type: ActionTypes.TOGGLE_MENU,
});

