import { Request, Response } from "express";
import authService from "../services/auth";
import responseHandler from "../utils/responseHandler";
import { ZodError, z } from "zod";
import helpers from "../utils/helpers";
import AppError from "../utils/appError";
import errors from '../utils/errors';

const signupAdminBodyType = z.object({
    username: z.string().refine(helpers.validateUsername, {
        message: 'Invalid username'
    }),
    name: z.optional(z.string()),
    email: z.string().refine(helpers.validateEmail, {
        message: 'Invalid email address'
    }),
    password: z.string().refine(helpers.validatePassword, {
        message: `Password isn't strong enough`
    })
});

const loginAdminBodyType = z.object({
    username: z.optional(z.string()),
    email: z.optional(z.string()),
    password: z.string()
});

class AuthController {
    signupAdmin = async (req: Request, res: Response) => {
        try {
            signupAdminBodyType.parse(req.body);
            const { username, name, email, password } = req.body;
            const user = await authService.signupAdmin({ username, name, email, password });
            return responseHandler.sendSuccessResponse({
                data: user,
                message: 'Admin Account successfully created',
            }, res)
        }
        catch (error) {
            console.log(error);
            if (error instanceof ZodError) {
                return responseHandler.sendErrorResponse(new AppError(errors.ERR_INVALID_REQUEST_DATA), res, error.errors);
            }
            return responseHandler.sendErrorResponse(error, res);
        }
    }

    loginAdmin = async (req: Request, res: Response) => {
        try {
            loginAdminBodyType.parse(req.body);
            const { username, email, password } = req.body;
            const user = await authService.loginAdmin({ username, email, password });
            return responseHandler.sendSuccessResponse({
                data: user,
                message: 'Login successful',
            }, res)
        }
        catch (error) {
            console.log(error);
            return responseHandler.sendErrorResponse(error, res);
        }
    }
}

const authController = new AuthController();
export default authController;