import z from "zod";
import { Document } from "mongoose";

import { ZBase } from "../utils/base-schema";

export interface IUserResponses {
	[key: string]: {
		statusCode: number;
		message: string;
	};
}

export const user = ZBase.extend({
	_id: z.string().optional(),
	role: z.string().optional(),
	username: z.string(),
	password: z.string(),
});
export interface IUser extends z.infer<typeof user> {}
export type UserDocument = Document & IUser;
