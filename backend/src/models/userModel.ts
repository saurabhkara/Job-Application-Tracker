import { Schema,model, InferSchemaType } from "mongoose";

const userSchema  = new Schema({
    username:{required:true, type:String,unique:true},
    email:{required:true,type:String,unique:true, select:false},
    password:{required:true,type:String,select:false}
})

type User = InferSchemaType<typeof userSchema>;

const UserModel = model<User>('User',userSchema);
export default UserModel;