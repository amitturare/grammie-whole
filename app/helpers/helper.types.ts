import { z } from "zod";
import { Document } from "mongoose";

import { ZBase } from "../utils/base-schema";

export interface IHelperResponses {
	[key: string]: {
		statusCode: number;
		message: string;
	};
}

export const ZHelper = ZBase.extend({
	name: z.string(),
	location: z.string(),
});
export interface IHelper extends z.infer<typeof ZHelper> {}
export type HelperDocument = Document & IHelper;
