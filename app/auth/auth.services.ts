import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

import userServices from "../users/user.services";
import { IUser } from "../users/user.types";

import { authResponses } from "./auth.responses";
import { ICredentials } from "./auth.types";

import { encrypt } from "../utils/encrypt";

const login = async (credentials: ICredentials) => {
	try {
		const user = await userServices.findOne({ username: credentials.username });
		const didMatch = await compare(credentials.password, user.password);
		if (!didMatch) throw authResponses.INVALID_CREDENTIALS;

		const { username, role } = user;
		const { JWT_SECRET } = process.env;
		const token = jwt.sign({ username, role }, JWT_SECRET || "");

		return { token, user: user.username };
	} catch (e) {
		throw authResponses.INVALID_CREDENTIALS;
	}
};

const signup = async (userData: IUser) => {
	try {
		const alreadyRegistered = await userServices.findOne(userData, true);
		if (alreadyRegistered) throw authResponses.USER_ALREADY_EXISTS;

		const encryptedPass = await encrypt(userData.password);
		userData = { ...userData, password: encryptedPass };
		userServices.insertOne(userData);

		return userData;
	} catch (e) {
		throw authResponses.REGISTRATION_FAILED;
	}
};

export default {
	login,
	signup,
};
