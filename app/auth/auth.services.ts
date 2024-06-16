import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import { sign } from "jsonwebtoken";

import { authResponses } from "./auth.responses";

import userServices from "../users/user.services";

const verifyGoogleCredentials = async (accessToken: string) => {
	try {
		const { GOOGLE_AUTH_CLIENT_ID, GOOGLE_AUTH_CLIENT_SECRET } = process.env;
		const client = new OAuth2Client(GOOGLE_AUTH_CLIENT_ID, GOOGLE_AUTH_CLIENT_SECRET);
		const tokenInfo = await client.verifyIdToken({
			idToken: accessToken,
			audience: GOOGLE_AUTH_CLIENT_ID,
		});
		const profile: any = tokenInfo.getPayload();
		if (!profile) throw authResponses.UNAUTHORIZED;

		const { email, picture: pictureUrl } = profile;
		if (!email || !pictureUrl) throw authResponses.LOGIN_FAILED;

		const userData = await userServices.findOneAndUpdate({ email }, { pictureUrl });
		if (!userData) throw authResponses.NOT_FOUND;

		const { JWT_SECRET } = process.env;
		const token = sign({ id: userData._id, role: userData.role }, JWT_SECRET || "");
		return { token, role: userData.role };
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw authResponses.SERVER_ERR;
	}
};

const authenticateWithGoogle = async (code: any) => {
	try {
		const { GOOGLE_AUTH_CLIENT_ID, GOOGLE_AUTH_CLIENT_SECRET, GOOGLE_AUTH_REDIRECT_URI } = process.env;
		const client = new OAuth2Client(GOOGLE_AUTH_CLIENT_ID, GOOGLE_AUTH_CLIENT_SECRET, GOOGLE_AUTH_REDIRECT_URI);

		const { tokens } = await client.getToken(code);
		client.setCredentials(tokens);
		const oauth2 = google.oauth2({
			auth: client,
			version: "v2",
		});

		const authData = await oauth2.userinfo.get();
		const profile = authData.data;
		if (!profile) throw authResponses.UNAUTHORIZED;

		const { email, picture: pictureUrl } = profile;
		if (!email || !pictureUrl) {
			throw authResponses.LOGIN_FAILED;
		}
        
		const data = await userServices.findOneAndUpdate({ email }, { pictureUrl });

		const { JWT_SECRET } = process.env;
		const token = sign({ email: data.email, role: data.role }, JWT_SECRET || "");
		return { token };
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw authResponses.SERVER_ERR;
	}
};

export default {
	verifyGoogleCredentials,
	authenticateWithGoogle,
};
