const initialState = {
    isConfigLoading: true,
    images: []
};


export default function Config(state = initialState, action) {
    switch(action.type) {
        case 'UPDATE_CONFIG_IMAGES':
            return {
                ...state,
                images: action.data
            };
        default:
            return state;
    }
}
