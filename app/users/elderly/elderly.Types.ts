import z from "zod";
import { Document } from "mongoose";

import { ZBaseUser } from "../user.types";

export const ZMedicalHistory = z.object({
	condition: z.string().optional(),
	diagnosisDate: z.date().optional(),
	treatments: z.array(z.string()).optional(),
});

export const ZMedication = z.object({ 
	name: z.string().optional(),
	dosage: z.string().optional(),
	frequency: z.string().optional(),
	prescribedBy: z.string().optional(),
});

export const ZElderlyUser = ZBaseUser.extend({
	age: z.number(),
	medicalHistory: z.array(ZMedicalHistory).optional(),
	medications: z.array(ZMedication).optional(),
});

export interface IElderlyUser extends z.infer<typeof ZElderlyUser> {}
export type ElderlyUserDocument = Document & IElderlyUser;
