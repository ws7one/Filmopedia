import {
    CHANGE_MESSAGE,
    IS_MOVIE_SEARCHING,
    SEARCH_MOVIE_SUCCESS,
    SEARCH_MOVIE_FAILURE
} from '../../ActionTypes';
import {
    initialNoResultMsg,
    emptySuccessResultMsg,
    searchFailureMsg
} from '../../../constants';

const INITIAL_STATE = {
    message: 'Hello World',
    searchResult: [],
    currentPage: 0,
    total: {
        pages: 0,
        results: 0
    },
    isSearching: false,
    noResultMessage: initialNoResultMsg
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_MESSAGE:
            return {
                ...state,
                message: action.message
            };

        case IS_MOVIE_SEARCHING:
            return {
                ...state,
                isSearching: true
            };

        case SEARCH_MOVIE_SUCCESS: {
            const newSearchResults = action.payload.page === 1
                ? action.payload.results
                : [...state.searchResult, ...action.payload.results];

            return {
                ...state,
                isSearching: false,
                searchResult: newSearchResults.sort((a, b) => (
                    a.vote_average * a.vote_count > b.vote_average * b.vote_count
                        ? -1
                        : a.vote_average * a.vote_count < b.vote_average * b.vote_count ? 1 : 0)
                ),
                currentPage: action.payload.page,
                total: {
                    pages: action.payload.total_pages,
                    results: action.payload.total_results
                },
                noResultMessage: emptySuccessResultMsg
            };
        }

        case SEARCH_MOVIE_FAILURE:
            return {
                ...state,
                isSearching: false,
                searchResult: [],
                currentPage: 0,
                total: {
                    pages: 0,
                    results: 0
                },
                noResultMessage: searchFailureMsg
            };

        default:
            return state;
    }
};
