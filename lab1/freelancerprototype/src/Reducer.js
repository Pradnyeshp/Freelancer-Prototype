
const initialState = {
    login_data : null,
    signup_success : null,
    signin_success : null,
    profile_updation : null,
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

            case 'PROFILE_UPDATE' :
                console.log(action.payload.data);
                return {
                    ...state,
                    profile_updation: action.payload.data
                }
                
            case 'PROJECTPOST_SUCCESS' :
                console.log(action.payload.data);
                return {
                    ...state,
                    projectpost_success: action.payload.data
                }

            default:
                return state;
        }
}

export default reducer;