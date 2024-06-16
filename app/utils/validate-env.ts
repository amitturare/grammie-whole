import { z } from "zod";
import { config } from "dotenv";

const envObject = z.object({
	PORT: z.coerce.number(),
	JWT_SECRET: z.string(),
	MONGO_URI: z.string(),
	GOOGLE_AUTH_CLIENT_ID: z.string(),
	GOOGLE_AUTH_CLIENT_SECRET: z.string(),
	GOOGLE_AUTH_CALLBACK_URI: z.string(),
});
type Env = z.infer<typeof envObject>;

export const validateENV = () => {
	try {
		config();
		envObject.parse(process.env);
	} catch (e) {
		throw { msg: "CONFIG ENV PROPERLY", error: e };
	}
};

declare global {
	namespace NodeJS {
		export interface ProcessEnv extends Env {}
	}

	namespace Express {
		interface Request {
			currUser: any;
		}
	}
}
