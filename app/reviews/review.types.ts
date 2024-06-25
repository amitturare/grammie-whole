import z from "zod";
import { Document, Types } from "mongoose";

import { ZBase } from "../utils/base-schema";

export const ZReview = ZBase.extend({
	userId: z.instanceof(Types.ObjectId),
	caretakerId: z.instanceof(Types.ObjectId),
	rating: z.number().max(5).min(0),
	feedback: z.string(),
});

export interface IReview extends z.infer<typeof ZReview> {}
export type ReviewDocument = Document & IReview;

export const ZReviewCreation = ZReview.omit({
	userId: true,
	caretakerId: true,
});
export interface IReviewCreation extends z.infer<typeof ZReviewCreation> {}
