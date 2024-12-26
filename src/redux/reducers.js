import {
    FETCH_EXCHANGE_RATES_REQUEST,
    FETCH_EXCHANGE_RATES_SUCCESS,
    FETCH_EXCHANGE_RATES_FAILURE,
    SET_SELL_CURRENCY,
    SET_BUY_CURRENCY,
    SET_SELL_AMOUNT,
    SET_BUY_AMOUNT,
    SET_IS_EDITING_SELL,
    SET_IS_EDITING_BUY,
    SWAP_CURRENCIES,
} from './actions';

const initialState = {
    exchangeRates: [],
    loading: false,
    error: null,
    sellCurrency: 'HKD',
    buyCurrency: 'USD',
    sellAmount: '',
    buyAmount: '',
    isEditingSell: false,
    isEditingBuy: false,
};

const exchangeRatesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EXCHANGE_RATES_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_EXCHANGE_RATES_SUCCESS:
            return { ...state, loading: false, exchangeRates: action.payload };
        case FETCH_EXCHANGE_RATES_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case SET_SELL_CURRENCY:
            return { ...state, sellCurrency: action.payload };
        case SET_BUY_CURRENCY:
            return { ...state, buyCurrency: action.payload };
        case SET_SELL_AMOUNT:
            return { ...state, sellAmount: action.payload };
        case SET_BUY_AMOUNT:
            return { ...state, buyAmount: action.payload };
        case SET_IS_EDITING_SELL:
            return { ...state, isEditingSell: action.payload };
        case SET_IS_EDITING_BUY:
            return { ...state, isEditingBuy: action.payload };
        case SWAP_CURRENCIES:
            return {
                ...state,
                sellCurrency: state.buyCurrency,
                buyCurrency: state.sellCurrency,
            };
        default:
            return state;
    }
};

export default exchangeRatesReducer;
