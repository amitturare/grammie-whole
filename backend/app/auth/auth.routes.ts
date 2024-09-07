import { Router } from "express";

import { Route } from "../routes/routes.types";
import { ResponseHandler } from "../utils/response-handler";

import authServices from "./auth.services";

const router = Router();

router.post("/google", async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const payload = await authServices.verifyGoogleCredentials(token as string);
		res.send(new ResponseHandler(payload));
	} catch (e) {
		next(e);
	}
});

// router.get("/google", (req, res, next) => {
// 	const { GOOGLE_AUTH_CLIENT_ID, GOOGLE_AUTH_REDIRECT_URI } = process.env;
// 	const scope = [
// 		"https://www.googleapis.com/auth/userinfo.email",
// 		"https://www.googleapis.com/auth/userinfo.profile",
// 		"openid",
// 	].join(" ");
// 	const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_AUTH_CLIENT_ID}&redirect_uri=${GOOGLE_AUTH_REDIRECT_URI}&response_type=code&scope=${encodeURIComponent(
// 		scope
// 	)}`;
// 	res.redirect(authUrl);
// });

// router.get("/google/callback", async (req, res, next) => {
// 	try {
// 		const { code } = req.query;
// 		const result = await authServices.authenticateWithGoogle(code);
// 		res.send(new ResponseHandler(result));
// 	} catch (e) {
// 		next(e);
// 	}
// });

export default new Route("/api/auth", router);
