import { combineReducers } from "redux";
import Config from './Config';
import MovieDetails from "./MovieDetails";
import MovieList from "./MovieList";

const appReducer = combineReducers({
    Config,
    MovieDetails,
    MovieList
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
