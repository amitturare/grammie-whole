import z from "zod";
import { Document } from "mongoose";
import { IPaginationSearchQueries, ZBase } from "../utils/base-schema";

export const ZBaseUser = ZBase.extend({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email(),
	location: z.string().optional(),
	pictureUrl: z.string().nullable().default(null).optional(),
	role: z.string().optional(),
});

export interface IBaseUser extends z.infer<typeof ZBaseUser> {}
export type BaseUserDocument = Document & IBaseUser;

export interface IUserPaginationSearchQueries extends IPaginationSearchQueries {
	filters: {
		department?: any;
		designation?: any;
	};
}
