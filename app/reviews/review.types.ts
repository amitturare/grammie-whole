import z from "zod";
import { Document } from "mongoose";

import { ZBase } from "../utils/base-schema";

export interface IReviewResponses {
	[key: string]: {
		statusCode: number;
		message: string;
	};
}

export const ZReview = ZBase.extend({
	helper: z.string(),
	user: z.string(),
	rating: z.number().min(1).max(5),
	feedback: z.string().optional(),
});
export interface IReview extends z.infer<typeof ZReview> {}
export type ReviewDocument = Document & IReview;
