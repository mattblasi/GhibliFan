import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import reducers from "./reducers";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";

const persistConfig = {
    key: "root",
    storage
};

const persistedReducers = persistReducer(persistConfig, reducers);

export const history = createBrowserHistory();
//to make redux devtools work
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];

export const store = createStore(
    persistedReducers,
    composeEnhancers(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);
