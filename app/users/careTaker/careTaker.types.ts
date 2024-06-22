import z from "zod";
import { Document } from "mongoose";

import { ZUser } from "../user.types";

export const ZCareTaker = ZUser.extend({
	servicesOffered: z.array(z.string()).optional(),
	workExperience: z.number().optional(),
	ratePerMonth: z.number(),
});

export interface ICareTaker extends z.infer<typeof ZCareTaker> {}
export type CareTakerDocument = Document & ICareTaker;

export const ZCareTakerRegistration = ZCareTaker.omit({
	firstName: true,
	lastName: true,
	email: true,
	pictureUrl: true,
});

export interface ICareTakerRegister extends z.infer<typeof ZCareTakerRegistration> {}
