import axios, { AxiosResponse, isAxiosError } from 'axios';
import { IJob, IServerError, IInputJob, IDeleteJob } from '../model/job';
import { IUser, IInputLogin, IInputSignUp } from '../model/user';


export const getAllJobs = async (): Promise<IJob[]> => {
    try {
        const res = await axios.get<IJob[]>('http://localhost:5005/api/jobs',{ withCredentials: true });
        return Promise.resolve(res.data);
    } catch (error) {
        if (isAxiosError<IServerError>(error)) {
            return Promise.reject({ message: error.message })
        }
        return Promise.reject({ message: "Something went wrong" });
    }
}



export const postJob = async (data: IInputJob): Promise<IJob> => {
    try {
        const job = await axios.post<IInputJob, AxiosResponse<IJob>>('http://localhost:5005/api/jobs', data, { withCredentials: true })
        return Promise.resolve(job.data)
    } catch (error) {
        if (isAxiosError<IServerError>(error)) {
            return Promise.reject({ message: error.message })
        }
        return Promise.reject(error)
    }
}


export const deleteJob = async (data: { jobId: string }) => {
    try {
        const dJob = await axios.delete<string, AxiosResponse<IDeleteJob>>(`http://localhost:5005/api/jobs/${data.jobId}, { withCredentials: true }`)
        return Promise.resolve(dJob.data)
    } catch (error) {
        if (isAxiosError<IServerError>(error)) {
            return Promise.reject({ message: error.message })
        }
        return Promise.reject(error)
    }
}

export const updateJob = async (jobId: string, data: IInputJob): Promise<IJob> => {
    try {
        const res = await axios.patch(`http://localhost:5005/api/jobs/${jobId}`, data, { withCredentials: true });
        console.log(res);
        return Promise.resolve(res.data)
    } catch (error) {
        if (isAxiosError<IServerError>(error)) {
            return Promise.reject({ message: error.message })
        }
        return Promise.reject(error)
    }
}





export const getLoginUser = async (data: IInputLogin): Promise<IUser> => {
    try {
        const res = await axios.post(`http://localhost:5005/api/user/login`, data, { withCredentials: true });
        return Promise.resolve(res.data);
    } catch (error) {
        if (isAxiosError<IServerError>(error)) {
            return Promise.reject({ message: error.message })
        }
        return Promise.reject(error)
    }
}


export const getSignUp = async (data: IInputSignUp): Promise<IUser> => {
    try {
        const res = await axios.post(`http://localhost:5005/api/user/signup`, data, { withCredentials: true })
        console.log(res);
        return Promise.resolve(res.data);
    } catch (error) {
        if (isAxiosError<IServerError>(error)) {
            return Promise.reject({ message: error.message })
        }
        return Promise.reject(error);
    }
}

export const getLoggedOut = async () => {
    try {
        const res = await axios.post(`http://localhost:5005/api/user/logout`, {}, { withCredentials: true });
        console.log(res);
    } catch (error) {
        if (isAxiosError<IServerError>(error)) {
            return Promise.reject({ message: error.message })
        }
        return Promise.reject(error);
    }
}

export const fetchLoggedInUser = async (): Promise<IUser> => {
    try {
        const res = await axios.get(`http://localhost:5005/api/user`, { withCredentials: true })
        return Promise.resolve(res.data);
    } catch (error) {
        if (isAxiosError<IServerError>(error)) {
            return Promise.reject({ message: error.message })
        }
        return Promise.reject(error);
    }
}