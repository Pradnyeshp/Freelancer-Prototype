
const initialState = {
    login_data : null,
    signup_success : null,
    error : null
}

const reducer = (state = initialState, action) => {
    
        switch (action.type) {
            case 'SIGNUP_SUCCESS' : 
                return { 
                    ...state,
                    signup_success : action.payload.data
                }

            case 'SIGNIN_SUCCESS' :
                console.log(action.payload.data);
                return {
                    ...state,
                    signin_success: action.payload.data[0] 
                }
        
            default:
                return state;
        }
}

export default reducer;