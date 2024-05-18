import { model } from "mongoose";
import { BaseSchema } from "../utils/base-schema";

import { ReviewDocument } from "./review.types";

const reviewSchema = new BaseSchema({
	helper: { type: String, require: true },
	user: { type: String, require: true },
	rating: { type: Number, min: 1, max: 5, require: true },
	feedback: { type: String },
});

export const reviewModel = model<ReviewDocument>("reviews", reviewSchema);
