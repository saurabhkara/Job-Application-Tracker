import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/userModel";
import bcrypt from 'bcrypt';


export const isUserAuthenticated: RequestHandler = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.session.userId).select("+email");
        if (!user) {
            throw createHttpError(401, "user does not authenticated");
        }
        return res.status(200).send(user)
    } catch (error) {
        next(error)
    }
}



interface IsignupReqBody {
    username?: string,
    email?: string,
    password?: string
}

export const signupController: RequestHandler<unknown, unknown, IsignupReqBody> = async (req, res, next) => {
    const userName = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;

    try {
        if (!userName || !email || !passwordRaw) {
            throw createHttpError(400, "All field are required");
        }

        const existingUserName = await UserModel.findOne({ username: userName }).exec();
        if (existingUserName) {
            throw createHttpError(404, "Username already taken, Choose another or login instead");
        }

        const existingEmail = await UserModel.findOne({ email: email });
        if (existingEmail) {
            throw createHttpError(404, 'Email already registered, Choose another or login instead');
        }

        const hashedPassword = await bcrypt.hash(passwordRaw, 10);

        const newUser = await UserModel.create({
            username: userName,
            email: email,
            password: hashedPassword,
        });

        req.session.userId = newUser._id;



        return res.status(201).json({ username: newUser.username, _id: newUser._id, email: newUser.email });

    } catch (error) {
        next(error);
    }
}


interface ILoginReqBody {
    username: string,
    password: string,
}

export const loginController: RequestHandler<unknown, unknown, ILoginReqBody, unknown> = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        if (!username || !password) {
            throw createHttpError(401, "Parameter missing")
        }
        const user = await UserModel.findOne({ username }).select("+password +email").exec();
        if (!user) {
            throw createHttpError(401, "Invalid credentials");
        }
        const matchedPassword = await bcrypt.compare(password, user.password);

        if (!matchedPassword) {
            throw createHttpError(401, "Invalid Password")
        }

        req.session.userId = user._id;

        return res.status(201).json(user)

    } catch (error) {
        console.log(error);
        next(error);
    }
}



export const logoutController: RequestHandler = async (req, res, next) => {
    console.log('Destroy session cookie')
    req.session.destroy((error) => {
        if (error) {
            next(error)
        } else {
            res.sendStatus(200);
        }
    })
}