import {
    CHANGE_MESSAGE,
    IS_MOVIE_SEARCHING,
    SEARCH_MOVIE_SUCCESS,
    SEARCH_MOVIE_FAILURE,
    SET_SELECTED_MOVIE,
    IS_DELTA_LOADING
} from '../../ActionTypes';
import NavigationService from '../../../NavigationService.js';
import { getResource } from '../../../services/ApiService';
import { searchEndpoint } from '../../../services/Endpoints';
import { DETAIL } from '../../../navigators/ScreenNames';
import { storeData } from '../../../constants/utils';
import { LAST_SEARCHED_QUERY } from '../../../constants';

export const changeMessage = text => dispatch => {
    dispatch({
        type: CHANGE_MESSAGE,
        message: text
    });
};

export const searchMovie = (query, page = 1) => dispatch => {
    console.log(query, ' page: ', page);
    const loadingType = page === 1 ? IS_MOVIE_SEARCHING : IS_DELTA_LOADING;
    console.log(loadingType);
    dispatch({ type: loadingType });
    getResource(searchEndpoint(query, page))
        .then(data => {
            console.log(data);
            storeData(query, LAST_SEARCHED_QUERY);
            dispatch({ type: SEARCH_MOVIE_SUCCESS, payload: data, query });
        })
        .catch(error => {
            dispatch({ type: SEARCH_MOVIE_FAILURE });
        });
};

export const navigateToDetail = (id) => dispatch => {
    dispatch({ type: SET_SELECTED_MOVIE, id });
    NavigationService.navigate(DETAIL);
};
