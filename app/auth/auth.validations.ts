import { body, params, query } from "../utils/validator";
import { ZCredentials, ZUserSignupData } from "./auth.types";

export const LoginValidations = [body(ZCredentials)];

export const SignupValidations = [body(ZUserSignupData)];
