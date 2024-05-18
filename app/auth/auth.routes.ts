import { NextFunction, Request, Response, Router } from "express";

import authServices from "./auth.services";
import { LoginValidations, SignupValidations } from "./auth.validations";

import { Route } from "../routes/routes.types";
import { ResponseHandler } from "../utils/response-handler";
import { ICredentials } from "./auth.types";

const router = Router();

router.post(
	"/login",
	...LoginValidations,
	async (req: Request<any, any, ICredentials, any>, res: Response, next: NextFunction) => {
		try {
			const { username, password } = req.body;
			const result = await authServices.login({ username, password });
			res.send(new ResponseHandler(result));
		} catch (e) {
			next(e);
		}
	}
);

router.post("/signup", ...SignupValidations, async (req, res, next) => {
	try {
		const result = await authServices.signup(req.body);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

export default new Route("/auth", router);
