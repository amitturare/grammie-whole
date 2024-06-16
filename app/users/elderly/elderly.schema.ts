import { Schema, model } from "mongoose";

import { baseUserModel } from "../user.schema";

import { ElderlyUserDocument } from "./elderly.types";

const medicalHistorySchema = new Schema({
	condition: { type: String },
	diagnosisDate: { type: Date },
	treatments: [{ type: String }],
});

const medicationSchema = new Schema({
	name: { type: String },
	dosage: { type: String },
	frequency: { type: String },
	prescribedBy: { type: String },
});

const elderlyUserSchema = new Schema({
	age: { type: Number },
	medicalHistory: [medicalHistorySchema],
	medications: [medicationSchema],
});

export const elderlyUserModel = baseUserModel.discriminator<ElderlyUserDocument>("User", elderlyUserSchema);
