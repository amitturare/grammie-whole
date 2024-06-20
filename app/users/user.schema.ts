import { model } from "mongoose";
import { BaseSchema } from "../utils/base-schema";

import { BaseUserDocument } from "./user.types";

const medicalHistorySchema = new BaseSchema({
	condition: { type: String },
	diagnosisDate: { type: Date },
	treatments: [{ type: String }],
});

const medicationSchema = new BaseSchema({
	name: { type: String },
	dosage: { type: String },
	frequency: { type: String },
});

const baseUserSchema = new BaseSchema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		location: { type: String, default: null },
		pictureUrl: { type: String, default: null },
		phoneNumber: { type: Number },
		age: { type: Number },
		gender: { type: String, enum: ["Male", "Female", "Other"] },
		aadharCardImageUrl: { type: String },
		role: { type: String, enum: ["user", "careTaker", "admin"], default: "user" },

		servicesOffered: [{ type: String }],
		workExperience: { type: Number },
		ratePerMonth: { type: Number },

		medicalHistory: [medicalHistorySchema],
		medications: [medicationSchema],
	},
	{ minimize: false }
);

export const baseUserModel = model<BaseUserDocument>("users", baseUserSchema);
