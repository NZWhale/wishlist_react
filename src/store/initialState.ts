import {StateInterface} from '../types'

const initialState: StateInterface = {
    users: [],
    loggedInUser: {
        username: "",
        id: "",
        cookie: ""
    },
    loggedInStatus: false
}

export default initialState