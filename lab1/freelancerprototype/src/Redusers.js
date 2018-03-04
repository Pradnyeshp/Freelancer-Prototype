import { combineReducers } from 'redux'

const rootReducer = combineReducers({


});

export default function SignUp(state = (this.props.state), action) {
    
        switch (action.type) {
            case 'SIGN_UP': 
                return{ ...state,

                }
                break;
        
            default:
                return state;
                break;
        }
}

export default rootReducer;