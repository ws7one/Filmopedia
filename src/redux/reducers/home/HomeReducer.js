import { CHANGE_MESSAGE } from '../../ActionTypes';

const INITIAL_STATE = {
    message: 'Hello World'
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_MESSAGE:
            return {
                ...state,
                message: action.message
            };

        default:
            return state;
    }
};
