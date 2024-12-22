import {
    FETCH_EXCHANGE_RATES_REQUEST,
    FETCH_EXCHANGE_RATES_SUCCESS,
    FETCH_EXCHANGE_RATES_FAILURE,
    SET_SELL_CURRENCY,
    SET_BUY_CURRENCY,
} from './actions';

const initialState = {
    exchangeRates: [],
    loading: false,
    error: null,
    sellCurrency: 'HKD',
    buyCurrency: 'USD',
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
        default:
            return state;
    }
};

export default exchangeRatesReducer;
