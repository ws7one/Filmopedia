import { combineReducers } from 'redux';
import HomeReducer from './home/HomeReducer';
import DetailReducer from './detail/DetailReducer';

export default combineReducers({
    homeReducer: HomeReducer,
    detailReducer: DetailReducer
});
