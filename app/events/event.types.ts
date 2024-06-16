import z from "zod";
import { Document } from "mongoose";

import { ZBase } from "../utils/base-schema";

export const ZEvent = ZBase.extend({
	createdBy: z.string(),
	title: z.string(),
	description: z.string(),
	location: z.string(),
	dateTime: z.string(),
	participants: z.array(z.string()),
});

export interface IEvent extends z.infer<typeof ZEvent> {}
export type EventDocument = Document & IEvent;
