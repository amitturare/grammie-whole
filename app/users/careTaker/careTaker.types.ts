import z from "zod";
import { Document } from "mongoose";

import { ZBaseUser } from "../user.types";

export const ZCareTaker = ZBaseUser.extend({
	aadharCardImageUrl: z.string(),
	servicesOffered: z.array(z.string()),
});

export interface ICareTaker extends z.infer<typeof ZCareTaker> {}
export type CareTakerDocument = Document & ICareTaker;
