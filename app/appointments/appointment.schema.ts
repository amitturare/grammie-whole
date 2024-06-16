import { Types, model } from "mongoose";
import { BaseSchema } from "../utils/base-schema";

import { UserDocument } from "./user.types";

const appointmentSchema = new BaseSchema({
	userId: { type: Types.ObjectId, ref: "BaseUser", required: true },
	caretakerId: { type: Types.ObjectId, ref: "BaseUser", required: true },
	dateTime: { type: Date, required: true },
	description: { type: String, required: true },
	status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
});

export const appointmentModel = model("Appointment", appointmentSchema);
