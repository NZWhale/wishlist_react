export interface Wish {
    id: string;
    image: string|null;
    title: string;
    url?: string;
    comment?: string;
}

export interface User {
    image?: string|null;
    username: string;
    dayOfBirth?: string;
    wishes: Array<Wish>;
    friends?: Array<User>
}

export interface StateInterface {
    users: Array<User>;
    loggedInUser: string;
    loggedInStatus: boolean;
}

export default interface Action<T> {
    type: string;
    payload: T;
}
