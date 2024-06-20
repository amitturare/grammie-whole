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
});

export const ZElderly = ZBaseUser.extend({
	medicalHistory: z.array(ZMedicalHistory).optional(),
	medications: z.array(ZMedication).optional(),
});

export interface IElderly extends z.infer<typeof ZElderly> {}
export type ElderlyDocument = Document & IElderly;

export const ZElderlyRegister = ZElderly.omit({
	firstName: true,
	lastName: true,
	email: true,
	pictureUrl: true,
	role: true,
});

export interface IElderlyRegister extends z.infer<typeof ZElderlyRegister> {}
