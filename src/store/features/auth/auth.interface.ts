export interface UserInterface {
    name?: string;
}
export interface AuthInterface {
    accessToken?: string;
    user?: string;
}

export interface LoginFormInterface {
    username: string,
    password: string,
}

export interface SignUpFormInterface {
    email: string,
    username: string,
    password: string,
}