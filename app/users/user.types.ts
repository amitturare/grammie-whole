import z from "zod";
import { Document } from "mongoose";

import { ZBase } from "../utils/base-schema";

export interface IUserResponses {
	[key: string]: {
		statusCode: number;
		message: string;
	};
}

export const ZUser = ZBase.extend({
	role: z.string().optional(),
	username: z.string(),
	password: z.string(),
});
export interface IUser extends z.infer<typeof ZUser> {}
export type UserDocument = Document & IUser;
