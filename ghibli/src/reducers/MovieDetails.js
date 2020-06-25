const initialState = {
    isMovieDetailsLoading: true,
    details: [],
    title: '',
    year: null
};


export default function MovieDetails(state = initialState, action) {
    switch(action.type) {
        case 'UPDATE_MOVIE_DETAILS':
            return {
                ...state,
                details: action.data
            };
        case 'UPDATE_MOVIE_TITLE_YEAR':
            return {
                ...state,
                title: action.data.title,
                year: action.data.year
            };
        case 'CLEAR_MOVIE_DETAILS':
            return {
                ...initialState
            };
        default:
            return state;
    }
}
