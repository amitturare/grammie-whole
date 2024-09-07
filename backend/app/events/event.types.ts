import z from "zod";
import { Document, Types } from "mongoose";

import { ZBase } from "../utils/base-schema";

export const ZEvent = ZBase.extend({
	createdBy: z.string(),
	title: z.string(),
	description: z.string(),
	duration: z.number(),
	lastDateToEnrol: z.string(),
	location: z.string(),
	dateTime: z.string(),
	cost: z.number(),
	participants: z.array(z.instanceof(Types.ObjectId)),
});

export interface IEvent extends z.infer<typeof ZEvent> {}
export type EventDocument = Document & IEvent;
