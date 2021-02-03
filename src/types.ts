export interface Wish {
    id: string;
    image: string|null;
    title: string;
    url?: string;
    comment?: string;
}

export interface User {
    id: string
    image?: string|null;
    username: string;
    dayOfBirth?: string;
    wishes: Array<Wish>;
    friends: Array<Friend>
}

export interface Friend {
    username: string;
    dayOfBirth?: string;
    image?: string|null;
    id: string;
    status: boolean;
}

export interface LoggedInUser {
        username: string,
        id: string
}

export interface StateInterface {
    users: Array<User>;
    loggedInUser: LoggedInUser;
    loggedInStatus: boolean;
}

export default interface Action<T> {
    type: string;
    payload: T;
}
