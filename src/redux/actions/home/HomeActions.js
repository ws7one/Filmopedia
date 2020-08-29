import {
    CHANGE_MESSAGE,
    IS_MOVIE_SEARCHING,
    SEARCH_MOVIE_SUCCESS,
    SEARCH_MOVIE_FAILURE
} from '../../ActionTypes';
import { getResource } from '../../../services/ApiService';
import { searchEndpoint } from '../../../services/Endpoints';

export const changeMessage = text => dispatch => {
    dispatch({
        type: CHANGE_MESSAGE,
        message: text
    });
};

export const searchMovie = (query, page = 1) => dispatch => {
    console.log('IS_MOVIE_SEARCHING');
    dispatch({ type: IS_MOVIE_SEARCHING });
    getResource(searchEndpoint(query, page))
        .then(data => {
            dispatch({ type: SEARCH_MOVIE_SUCCESS, payload: data });
        })
        .catch(error => {
            dispatch({ type: SEARCH_MOVIE_FAILURE });
        });
};
