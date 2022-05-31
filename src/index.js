import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

import reducer from "./redux/reducer";
import { asyncMoreTickets } from "./redux/actions";
import App from "./components/App";

import "./index.css";
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);
/* eslint-enable */

store.dispatch(asyncMoreTickets());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
