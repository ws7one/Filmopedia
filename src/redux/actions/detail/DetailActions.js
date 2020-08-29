import { IS_MOVIE_LOADING, MOVIE_FETCH_SUCCESS, MOVIE_FETCH_FAILURE } from '../../ActionTypes';
import { getResource } from '../../../services/ApiService';
import { movieEndpoint } from '../../../services/Endpoints';

export const getMovieDetails = () => (dispatch, getState) => {
    const { selectedId } = getState().detailReducer;
    if (selectedId) {
        dispatch({ type: IS_MOVIE_LOADING });
        getResource(movieEndpoint(selectedId))
            .then(data => {
                dispatch({ type: MOVIE_FETCH_SUCCESS, payload: data });
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: MOVIE_FETCH_FAILURE });
            });
    }
};
