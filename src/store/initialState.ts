import {StateInterface} from '../types'

const initialState: StateInterface = {
    users: [{"image": "undefined", "username": "littlewhale", "dayOfBirth": "28.09.1994", "wishes": [{"title": "freedom", "comment": "i want to be free"}, {"title": "car", "url": "https://subaru.com", "comment": "subaru wrx sti"}]}, {"image": "undefined", "username": "test", "dayOfBirth": "01.01.1970", "wishes": [{"title": "test", "url": "https://test.com", "comment": "test comment"}, {"title": "test2", "url": "https://test2.com", "comment": "second test comment"}]}],
    loggedInUser: "littlewhale",
}

export default initialState