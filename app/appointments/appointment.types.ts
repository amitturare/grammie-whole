import { z } from "zod";
import { Document } from "mongoose";

import { ZBase } from "../utils/base-schema";

export interface IAppointmentResponses {
	[key: string]: {
		statusCode: number;
		message: string;
	};
}

export const ZAppointment = ZBase.extend({
	user: z.string(),
	helper: z.string(),
	dateTime: z.date(),
});
export interface IAppointment extends z.infer<typeof ZAppointment> {}
export type AppointmentDocument = Document & IAppointment;
