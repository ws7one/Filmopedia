import {
    CHANGE_MESSAGE,
    IS_MOVIE_SEARCHING,
    SEARCH_MOVIE_SUCCESS,
    SEARCH_MOVIE_FAILURE,
    IS_DELTA_LOADING
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
    noResultMessage: initialNoResultMsg,
    lastSearchedQuery: '',
    isDeltaLoading: false
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

        case IS_DELTA_LOADING:
            return {
                ...state,
                isDeltaLoading: true
            };

        case SEARCH_MOVIE_SUCCESS: {
            let newSearchResults = [];
            const loadingCard = { isLoading: true, id: -1 };
            const pushLoadingCard = action.payload.page < action.payload.total_pages;
            if (action.payload.page === 1) {
                newSearchResults = [...action.payload.results];
            } else {
                newSearchResults = [...state.searchResult];
                newSearchResults.pop();
                newSearchResults = [...newSearchResults, ...action.payload.results];
            }

            if (pushLoadingCard) newSearchResults.push(loadingCard);

            return {
                ...state,
                isSearching: false,
                isDeltaLoading: false,
                searchResult: newSearchResults,
                //Tried applying sort on ratings, but with an infinite scroll, this gets tedious
                //So to maintain usability, i have left it out
                // .sort((a, b) => (
                //     a.vote_average * a.vote_count > b.vote_average * b.vote_count
                //         ? -1
                //         : a.vote_average * a.vote_count < b.vote_average * b.vote_count ? 1 : 0)
                // ),
                currentPage: action.payload.page,
                total: {
                    pages: action.payload.total_pages,
                    results: action.payload.total_results
                },
                noResultMessage: emptySuccessResultMsg,
                lastSearchedQuery: action.query
            };
        }

        case SEARCH_MOVIE_FAILURE:
            return {
                ...state,
                isSearching: false,
                isDeltaLoading: false,
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
