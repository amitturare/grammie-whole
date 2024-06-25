import { Types, model } from "mongoose";
import { BaseSchema } from "../utils/base-schema";

// import { UserDocument } from "./user.types";

const reviewSchema = new BaseSchema({
	userId: { type: Types.ObjectId, ref: "users", required: true },
	caretakerId: { type: Types.ObjectId, ref: "users", required: true },
	rating: { type: Number, required: true },
	feedback: { type: String },
});

export const reviewModel = model("reviews", reviewSchema);