import Action, { User } from "../../types"


const setUsersAction: string = "SET_USERS"

const setUsers = (value: Array<User> | null): Action<any> => {
    return { 
        type: setUsersAction,
        payload: value
    }
}

export default setUsers