import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk'
import { invoiceReducer } from './reducers/invoiceReducer';

export const store = createStore(invoiceReducer, applyMiddleware(thunk));