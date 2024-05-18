import { body, params, query } from "../utils/validator";
import { Credentials, UserSignupData } from "./auth.types";

export const LoginValidations = [
	body(Credentials),
	// params(ICredentials),
	// query(ICredentials)s
];

export const SignupValidations = [
	body(UserSignupData),
	// params(ICredentials),
	// query(ICredentials)s
];
