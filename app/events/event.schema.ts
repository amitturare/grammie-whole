import { Types, model } from "mongoose";
import { BaseSchema } from "../utils/base-schema";

import { EventDocument } from "./event.types";

const eventSchema = new BaseSchema({
	createdBy: { type: Types.ObjectId, ref: "BaseUser", required: true },
	title: { type: String, required: true },
	description: { type: String, required: true },
	location: { type: String, required: true },
	dateTime: { type: Date, required: true },
	participants: [{ type: Types.ObjectId, ref: "BaseUser" }],
});

export const eventModel = model<EventDocument>("Event", eventSchema);
