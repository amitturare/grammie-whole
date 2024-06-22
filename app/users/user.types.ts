import z from "zod";
import { Document } from "mongoose";
import { ZBase } from "../utils/base-schema";

export const ZUser = ZBase.extend({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email(),
	location: z.string().optional().nullable().optional(),
	pictureUrl: z.string().nullable().optional(),
	phoneNumber: z.number(),
	age: z.number(),
	gender: z.enum(["Male", "Female", "Other"]),
	aadharCardImageUrl: z.string(),
	role: z.string().optional(),
});

export interface IUser extends z.infer<typeof ZUser> {}
export type UserDocument = Document & IUser;
