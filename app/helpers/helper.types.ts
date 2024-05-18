import { z } from "zod";
import { ZBase } from "../utils/base-schema";
import { Document } from "mongoose";

export interface IHelperResponses {
	[key: string]: {
		statusCode: number;
		message: string;
	};
}

export const ZHelper = ZBase.extend({
	id: z.string(),
	helper: z.string(),
	location: z.string(),
});
export interface IHelper extends z.infer<typeof ZHelper> {}
export type HelperDocument = Document & IHelper;

export const ZHelperId = ZHelper.pick({ id: true });
export const ZHelperWithoutId = ZHelper.pick({ helper: true, location: true });
