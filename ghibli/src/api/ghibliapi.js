import axios from "axios";

const ghibli_api = "http://localhost:9000";

export const getMovieList = () => {
    return async dispatch => {
        const response = await axios.get(ghibli_api + '/movie');
        dispatch(triggerAction("UPDATE_MOVIES", response.data));
    }
}

export const getMovieDetails = (name, year) => {
    return async dispatch => {
        const response = await axios.get(ghibli_api + '/movie/detail/' + name + '/' + year);
        dispatch(triggerAction("UPDATE_MOVIE_DETAILS", response.data));
    }
}

export const getSiteImageConfig = () => {
    return async dispatch => {
        const response = await axios.get(ghibli_api + '/config/images/');
        dispatch(triggerAction("UPDATE_CONFIG_IMAGES", response.data));
    }
}

export const updateTitleAndYear = (title, year) => {
    return async dispatch => {
        dispatch(getMovieDetails(title, year));
        dispatch(triggerAction("UPDATE_MOVIE_TITLE_YEAR", {title: title, year: year} ))
    }
}

export const clearMovieDetails = () => {
    return async dispatch => {
        dispatch(triggerAction("CLEAR_MOVIE_DETAILS", null))
    }
}

function triggerAction(type, data) {
    return {
        type: type,
        data: data
    }
}
