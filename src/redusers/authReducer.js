
const defaultState = {
    authorizationStatus: false
}

export default function authReducer(state = defaultState, action) {
    switch (action.type) {
        case "LOG_IN":
            return {...state, authorizationStatus: true}
        case "LOG_OUT":
            return {...state, authorizationStatus: false}
        default:
            return state
    }
}
