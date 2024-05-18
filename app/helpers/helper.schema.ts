import { model } from "mongoose";
import { BaseSchema } from "../utils/base-schema";

import { HelperDocument } from "./helper.types";

const helperSchema = new BaseSchema({
	id: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
});

export const helperModel = model<HelperDocument>("helpers", helperSchema);
