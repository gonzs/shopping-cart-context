import { createStore, applyMiddleware } from 'redux';
import RootReducer from '../Reducers';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';

const Store = createStore(
  RootReducer,

  composeWithDevTools(applyMiddleware(reduxThunk))
);
export default Store;
