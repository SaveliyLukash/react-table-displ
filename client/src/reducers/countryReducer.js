// import {v4 as uuid} from 'uuid';
import {
    GET_COUNTRIES,

} from '../actions/types';

const initialState = {
    countries: [],
    pageCount: 0
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload.countries,
                pageCount: action.payload.pageCount
            }
        default:
            return state;
    }
}