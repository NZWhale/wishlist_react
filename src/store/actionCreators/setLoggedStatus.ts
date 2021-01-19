import Action, { User } from "../../types"


const setLoggedStatusAction: string = "SET_LOGGED_STATUS"

const setLoggedInStatus = (value: boolean | null): Action<any> => {
    return { 
        type: setLoggedStatusAction,
        payload: value
    }
}

export default setLoggedInStatus