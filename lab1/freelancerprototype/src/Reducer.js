
const initialState = {
    login_data : null,
    signup_success : null
}

const reducer = (state = initialState, action) => {
    
        switch (action.type) {
            case 'SIGNUP_SUCCESS': 
                return{ 
                    ...state,
                    signup_success : action.payload.data
                }
        
            default:
                return state;
        }
}

export default reducer;