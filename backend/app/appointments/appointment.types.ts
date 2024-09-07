import z from "zod";
import { Document, Types } from "mongoose";

import { ZBase } from "../utils/base-schema";

export const ZAppointment = ZBase.extend({
	userId: z.instanceof(Types.ObjectId),
	caretakerId: z.instanceof(Types.ObjectId),
	dateTime: z.string().or(z.date()),
	description: z.string(),
	status: z.enum(["pending", "accepted", "rejected"]).default("pending"),
	isTerminated: z.boolean(),
});

export interface IAppointment extends z.infer<typeof ZAppointment> {}
export type AppointmentDocument = Document & IAppointment;

export const ZAppointmentCreation = ZAppointment.omit({
	userId: true,
	caretakerId: true,
	status: true,
	isTerminated: true,
});
export interface IAppointmentCreation extends z.infer<typeof ZAppointmentCreation> {}
