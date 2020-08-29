import {
    SET_SELECTED_MOVIE,
    IS_MOVIE_LOADING,
    MOVIE_FETCH_SUCCESS,
    MOVIE_FETCH_FAILURE
} from '../../ActionTypes';

const INITIAL_STATE = {
    selectedId: null,
    isLoading: false,
    movieData: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_SELECTED_MOVIE:
            return {
                ...state,
                selectedId: action.id,
                movieData: null
            };

        case IS_MOVIE_LOADING:
            return {
                ...state,
                isLoading: true,
            };

        case MOVIE_FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                movieData: action.payload
            };

        case MOVIE_FETCH_FAILURE:
            return {
                ...state,
                isLoading: false,
                movieData: null
            };

        default:
            return state;
    }
};
