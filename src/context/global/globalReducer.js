import { GET_DATA, GET_COUNTRIES, GET_FLAG, SET_CARD_LOADING, SET_LIST_LOADING, SET_CURRENT_COUNTRY } from "../types";

const globalReducer = (state, action) => {
    switch (action.type) {
        case GET_DATA:
            return {
                ...state,
                data: action.payload,
                cardLoading: false
            };
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                listLoading: false
            };
        case SET_CURRENT_COUNTRY:
            return {
                ...state,
                current: action.payload
            };
        case GET_FLAG:
            return state;
        case SET_CARD_LOADING:
            return {
                ...state,
                cardLoading: action.payload
            };
        case SET_LIST_LOADING:
            return {
                ...state,
                listLoading: action.payload
            };
        default:
            return state;
    }
}

export default globalReducer;