import { convertToSlug, convertToSpaces } from './strings';

export const getMovie = (name, movies) => {
    name = convertToSpaces(name);
    return movies.filter((movie) => {
        return convertToSlug(movie.title.toLowerCase()) === convertToSlug(name);
    })[0]
}


export const movieLoading = dispatch => {
    return async dispatch => {
        dispatch({type: 'TOGGLE_IS_MOVIE_LIST_LOADING', data: true})
    }
}

export const movieLoaded = dispatch => {
    return async dispatch => {
        dispatch({type: 'TOGGLE_IS_MOVIE_LIST_LOADING', data: false})
    }
}

export const incrementMovieLoaded = dispatch => {
    return async dispatch => {
        dispatch({type: 'MOVIES_LOADED'})
    }
}

export const resetMovieLoaded = dispatch => {
    return async dispatch => {
        dispatch({type: 'MOVIES_LOADED_RESET'})
    }
}

export const movieHeroLoading = dispatch => {
    return async dispatch => {
        dispatch({type: 'TOGGLE_IS_MOVIE_HERO_LOADING', data: true})
    }
}
export const movieHeroLoaded = dispatch => {
    return async dispatch => {
        dispatch({type: 'TOGGLE_IS_MOVIE_HERO_LOADING', data: false})
    }
}

export const incrementHeroItem = dispatch => {
    return async dispatch => {
        dispatch({type: 'MOVIES_HERO_ITEMS_LOADED'})
    }
}

export const resetHeroItemCount = dispatch => {
    return async dispatch => {
        dispatch({type: 'MOVIES_HERO_ITEMS_RESET'})
    }
}
