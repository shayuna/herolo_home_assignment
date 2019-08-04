import { createStore, combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import pageManagerReducer from "../reducers/pageManagerRdc.js";

 function configureStore(initialState) {
    return createStore(
        combineReducers({
            pageManager: pageManagerReducer
          }),
          initialState,
        applyMiddleware(thunk)
    );
}

const store = configureStore();
export default store;
