import {StateInterface} from '../types'

const initialState: StateInterface = {
    users: [],
    loggedInUser: {
        username: "",
        id: ""
    },
    loggedInStatus: false
}

export default initialState