import CustomErrorHandler from "../util/CustomErrorHandler";
import JobModel from "../models/jobModel";
import { NextFunction, Request, RequestHandler, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import mongoose from "mongoose";
import assertDefine from "../util/assertDefine";

//Get jobs controller
export const getJobsController = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.session.userId;
    try {
        assertDefine(userId);

        const jobs = await JobModel.find({userId:userId}).exec();

        return res.status(200).json(jobs);
    } catch (error) {
        console.log("Error Happend in get catch")
        next(CustomErrorHandler.internalError(500, 'Internal Error'));
    }
}

//Get Particular job controller
export const getJobController: RequestHandler = async (req, res, next) => {
    const jobId = req.params.jobId;
    const userId = req.session.userId;
    try {
        assertDefine(userId)
        if (!mongoose.isValidObjectId(jobId)) {
            throw createHttpError(400, "Invalid Job") 
        }
        const job = await JobModel.findById(jobId).exec();
        if (!job) {
            throw createHttpError(404, 'Job not found');
        }
        if(!job.userId.equals(userId)){
            throw createHttpError(401,"You can't access this job right now");
        }
        return res.status(200).json(job);
    } catch (error) {
        next(error)
    }
}

//Create job document controller
interface ICreateJobReqBody {
    company: string,
    profile: string,
    status?: string,
    platform?: string,
    contact?: {
        hr: string,
        mobile: string,
        email: string
    },


}

export const createJobController: RequestHandler<unknown, unknown, ICreateJobReqBody, unknown> = async (req, res, next) => {
    const { company, profile, status, contact, platform }: ICreateJobReqBody = req.body;
    const userId = req.session.userId;
    try {
        assertDefine(userId);
        if (!company) {
            throw createHttpError(400, "Company field required")
        }
        if (!profile) {
            throw createHttpError(400, "Profile field required")
        }
        const job = await JobModel.create({
            userId,
            company,
            contact,
            platform,
            profile,
            status,
        })
        res.status(201).json(job)
    } catch (error) {
        if (isHttpError(error)) {
            next(error)
        }
        next(CustomErrorHandler.internalError(500, 'Internal server Error'))
    }
}

//Update Job Controller

interface IUpdateReqBody {
    status: string,
    platform:string,
    contact?: {
        hr?: string,
        email?: string,
        mobile?: string
    }
}

interface IUpdateParams {
    jobId: string
}

export const updateJobController: RequestHandler<IUpdateParams, unknown, IUpdateReqBody, unknown> = async (req, res, next) => {
    const jobId = req.params.jobId;
    const newStatus = req.body.status;
    const contact = req.body.contact;
    const newPlatForm = req.body.platform;
    const userId = req.session.userId;
    try {
        assertDefine(userId);
    
        if (!mongoose.isValidObjectId(jobId)) {
            throw createHttpError(400, "Invalid Job")
        }
        const job = await JobModel.findById(jobId).exec();
        if (!job) {
            throw createHttpError(404, 'Job not found');
        }
        if(!newStatus){
            throw createHttpError(400,"Status required")
        }
        job.status= newStatus;
        job.contact = contact;
        job.platform = newPlatForm
        if(!job.userId.equals(userId)){
            throw createHttpError(401,"You cannot update this job application details");
        }
        const updatedJobRecord =await job.save();
        return res.status(201).json(updatedJobRecord)
    } catch (error) {
        next(error)
    }
}


//delete job controller
export const deleteJobController:RequestHandler = async (req,res,next)=>{
    const jobId = req.params.jobId;
    const userId = req.session.userId;
    try {
        assertDefine(userId);
        if(!mongoose.isValidObjectId(jobId)){
            throw createHttpError(400,"Invalid Job ");
        }
        const job = await JobModel.findById(jobId);
        if(!job){
            throw createHttpError(404, "Job don't exist");
        }
        if(!job.userId.equals(userId)){
            throw createHttpError(401,"you cannot delete this job")
        }
        await job.remove();
        return res.status(200).json({message:"Job Application Deleted"});
    } catch (error) {
        next(error)
    }
}

