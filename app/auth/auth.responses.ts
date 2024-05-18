import { IAuthResponses } from "./auth.types";

export const authResponses: IAuthResponses = {
	INVALID_CREDENTIALS: {
		statusCode: 400,
		message: "INVALID CREDENTIALS",
	},
	USER_ALREADY_EXISTS: {
		statusCode: 400,
		message: "USER ALREADY EXISTS",
	},
	REGISTRATION_FAILED: {
		statusCode: 400,
		message: "REGISTRATION FAILED",
	},
};
