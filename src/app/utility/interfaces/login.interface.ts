export interface ISignIn{
    username:string;
    password:string;
}

export interface IRegistration{
    username:string;
    password:string;
    email:string,
    roles:string
}

export interface ILoginResponse {
    id?:          number;
    username?:    string;
    email?:       string;
    roles?:       string[];
    accessToken?: string;
}
