import { CHANGE_MESSAGE } from '../../ActionTypes';

export const changeMessage = text => dispatch => {
    dispatch({
        type: CHANGE_MESSAGE,
        message: text
    });
};
