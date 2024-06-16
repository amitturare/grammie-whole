import { Schema, model } from "mongoose";

import { baseUserModel } from "../user.schema";

import { CareTakerDocument } from "./careTaker.types";

const caretakerSchema = new Schema({
	aadharCardImageUrl: { type: String, required: true },
	servicesOffered: [{ type: String }],
});

export const careTakerModel = baseUserModel.discriminator<CareTakerDocument>("Caretaker", caretakerSchema);
