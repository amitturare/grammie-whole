import { model } from "mongoose";
import { BaseSchema } from "../utils/base-schema";

import { AppointmentDocument } from "./appointment.types";

const appointmentSchema = new BaseSchema({
	user: {
		type: String,
		required: true,
	},
	helper: {
		type: String,
		required: true,
	},
	dateTime: {
		type: Date,
		required: true,
	},
});

export const appointmentModel = model<AppointmentDocument>("appointments", appointmentSchema);
