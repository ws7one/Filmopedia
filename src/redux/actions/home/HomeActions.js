import {
    CHANGE_MESSAGE,
    IS_MOVIE_SEARCHING,
    SEARCH_MOVIE_SUCCESS,
    SEARCH_MOVIE_FAILURE,
    SET_SELECTED_MOVIE
} from '../../ActionTypes';
import NavigationService from '../../../NavigationService.js';
import { getResource } from '../../../services/ApiService';
import { searchEndpoint } from '../../../services/Endpoints';
import { DETAIL } from '../../../navigators/ScreenNames';

export const changeMessage = text => dispatch => {
    dispatch({
        type: CHANGE_MESSAGE,
        message: text
    });
};

export const searchMovie = (query, page = 1) => dispatch => {
    dispatch({ type: IS_MOVIE_SEARCHING });
    getResource(searchEndpoint(query, page))
        .then(data => {
            dispatch({ type: SEARCH_MOVIE_SUCCESS, payload: data });
        })
        .catch(error => {
            dispatch({ type: SEARCH_MOVIE_FAILURE });
        });
};

export const navigateToDetail = (id) => dispatch => {
    dispatch({ type: SET_SELECTED_MOVIE, id });
    NavigationService.navigate(DETAIL);
};
