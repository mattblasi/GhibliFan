const initialState = {
    isMovieListLoading: true,
    isMovieHeroLoading: true,
    movies: [],
    movieCount: null,
    movieLoaded: 0,
    heroItemsCount: 3,
    heroItemsLoaded: 0
};


export default function MovieList(state = initialState, action) {
    switch(action.type) {
        case 'TOGGLE_IS_MOVIE_LIST_LOADING':
            return {
                ...state,
                isMovieListLoading: action.data
            }
        case 'TOGGLE_IS_MOVIE_HERO_LOADING':
            return {
                ...state,
                isMovieHeroLoading: action.data
            }
        case 'UPDATE_MOVIES':
            return {
                ...state,
                movies: action.data,
                movieCount: action.data.length
            }
        case 'MOVIES_LOADED':
            return {
                ...state,
                movieLoaded: state.movieLoaded + 1
            }
        case 'MOVIES_LOADED_RESET':
            return {
                ...state,
                movieLoaded: 0,
                isMovieListLoading: true
            }
        case 'MOVIES_HERO_ITEMS_LOADED':
            return {
                ...state,
                heroItemsLoaded: state.heroItemsLoaded + 1
            }
        case 'MOVIES_HERO_ITEMS_RESET':
            return {
                ...state,
                heroItemsLoaded: 0,
                isMovieHeroLoading: true,
            }
        default:
            return state;
    }
}
