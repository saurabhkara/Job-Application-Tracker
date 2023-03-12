
interface IContact{
    hr?:string,
    mobile?:string,
    email?:string
}
export interface IJob{
    _id:string,
    createdAt:string,
    updatedAt:string,
    company:string,
    profile:string,
    platform?:string,
    status?:string,
    contact?:IContact
}

export interface IServerError{
    message:string
}

export interface IInputJob{
    company:string,
    profile:string,
    platform?:string,
    status?:string,
    contact?:{
        hr:string,
        mobile:string,
        email:string
    }
}

export interface IDeleteJob {
    message: string
}
