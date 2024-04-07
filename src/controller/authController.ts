import { Request, Response } from "express";
import authService from "../services/auth";
import responseHandler from "../utils/responseHandler";
import { z } from "zod";

const signupAdminBodyType = z.object({
    username: z.string(),
    firstName: z.optional(z.string()),
    lastName: z.optional(z.string()),
    email: z.string(),
    password: z.string()
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
            const { username, firstName, lastName, email, password } = req.body;
            const user = await authService.signupAdmin({ username, firstName, lastName, email, password });
            return responseHandler.sendSuccessResponse({
                data: user,
                message: 'Admin Account successfully created',
            }, res)
        }
        catch (error) {
            console.log(error);
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