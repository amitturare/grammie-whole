import { Types, model } from "mongoose";
import { BaseSchema } from "../utils/base-schema";

import { AppointmentDocument } from "./appointment.types";

const appointmentSchema = new BaseSchema({
	userId: { type: Types.ObjectId, ref: "users", required: true },
	caretakerId: { type: Types.ObjectId, ref: "users", required: true },
	dateTime: { type: Date, required: true },
	description: { type: String, required: true },
	status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
	isTerminated: { type: Boolean, default: false },
});

export const appointmentModel = model<AppointmentDocument>("appointments", appointmentSchema);
