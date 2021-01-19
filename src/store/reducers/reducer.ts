import { StateInterface } from "../../types";
import initialState from "../initialState";
import  Action  from "../../types";


const reducer = (state = initialState, action: Action<any>): StateInterface => {
    switch (action.type) {
        case "SET_USERS":
            return { ...state, users: action.payload}
        case "SET_LOGGED_IN_USER":
            return { ...state, loggedInUser: action.payload}
        case "SET_LOGGED_STATUS":
            return { ...state, loggedInStatus: action.payload}
    }
    return state
}

export default reducer