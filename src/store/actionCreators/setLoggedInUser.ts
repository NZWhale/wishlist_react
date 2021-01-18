import Action, { User } from "../../types"


const setLoggedInUserAction: string = "SET_LOGGED_IN_USER"

const setLoggedInUser = (value: User | null): Action<any> => {
    return { 
        type: setLoggedInUserAction,
        payload: value
    }
}

export default setLoggedInUser