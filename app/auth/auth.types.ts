import { z } from "zod";

import { ZUser } from "../users/user.types";

export interface IAuthResponses {
	[key: string]: {
		statusCode: number;
		message: string;
	};
}

export const ZCredentials = ZUser.pick({ username: true, password: true });
export interface ICredentials extends z.infer<typeof ZCredentials> {}

export const ZUserSignupData = ZUser.pick({ username: true, password: true, role: true });
export interface SignupData extends z.infer<typeof ZUserSignupData> {}
