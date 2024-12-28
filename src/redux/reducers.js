import { ActionTypes } from './actions';

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
    isMenuOpen: false,
};

const exchangeRatesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_EXCHANGE_RATES_REQUEST:
            return { ...state, loading: true, error: null };
        case ActionTypes.FETCH_EXCHANGE_RATES_SUCCESS:
            return { ...state, loading: false, exchangeRates: action.payload };
        case ActionTypes.FETCH_EXCHANGE_RATES_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case ActionTypes.SET_SELL_CURRENCY:
            return { ...state, sellCurrency: action.payload };
        case ActionTypes.SET_BUY_CURRENCY:
            return { ...state, buyCurrency: action.payload };
        case ActionTypes.SET_SELL_AMOUNT:
            return { ...state, sellAmount: action.payload };
        case ActionTypes.SET_BUY_AMOUNT:
            return { ...state, buyAmount: action.payload };
        case ActionTypes.SET_IS_EDITING_SELL:
            return { ...state, isEditingSell: action.payload };
        case ActionTypes.SET_IS_EDITING_BUY:
            return { ...state, isEditingBuy: action.payload };
        case ActionTypes.SWAP_CURRENCIES:
            return {
                ...state,
                sellCurrency: state.buyCurrency,
                buyCurrency: state.sellCurrency,
            };
        case ActionTypes.TOGGLE_MENU:
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen,
            };
        default:
            return state;
    }
};

export default exchangeRatesReducer;