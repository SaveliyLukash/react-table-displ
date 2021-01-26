import {GET_COUNTRIES} from "./types";
import axios from "axios";

export const getCountriesSort = (sortParams, page) => (dispatch) => {

    axios
        .get('/api/covid/all', {
            params: {...sortParams, ...page}
        })
        .then(res => dispatch({
            type: GET_COUNTRIES,
            payload: res.data
        }))
        .catch(err => {
            console.log("Error!")
        });
}