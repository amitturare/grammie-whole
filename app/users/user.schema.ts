import { model } from "mongoose";
import { BaseSchema } from "../utils/base-schema";

import { UserDocument } from "./user.types";

// const medicalHistorySchema = new BaseSchema({
// 	condition: { type: String },
// 	diagnosisDate: { type: Date },
// 	treatments: [{ type: String }],
// });

// const medicationSchema = new BaseSchema({
// 	name: { type: String },
// 	dosage: { type: String },
// 	frequency: { type: String },
// });

const userSchema = new BaseSchema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	location: { type: String },
	pictureUrl: { type: String, default: null },
	phoneNumber: { type: Number },
	age: { type: Number },
	gender: { type: String, enum: ["Male", "Female", "Other"] },
	aadharCardImageUrl: { type: String },
	role: { type: String, enum: ["user", "careTaker", "admin"], default: "user" },

	// servicesOffered: [{ type: String }],
	// workExperience: { type: Number },
	// ratePerMonth: { type: Number },

	// medicalHistory: [medicalHistorySchema],
	// medications: [medicationSchema],
});

export const userModel = model<UserDocument>("users", userSchema);
