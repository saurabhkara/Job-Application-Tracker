import { Schema, InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const jobSchema = new Schema({
    userId : {type:Schema.Types.ObjectId, required:true},
    company:{
        type:String,
        required:true,
    },
    profile:{
        type:String,
        required:true,
    },
    platform:{
        type:String,
    },
    status:{
        type:String,
        default:'applied'
    },
    contact:{
        hr:String,
        email:String,
        mobile:String,
    }
},{timestamps:true});


type jobSchemaType = InferSchemaType<typeof jobSchema>;

const JobModel = mongoose.model<jobSchemaType>('Job',jobSchema);

export default JobModel;
