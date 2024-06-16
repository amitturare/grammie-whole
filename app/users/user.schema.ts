import { model } from "mongoose";
import { BaseSchema } from "../utils/base-schema";

import { BaseUserDocument } from "./user.types";

const baseUserSchema = new BaseSchema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		location: { type: String },
		pictureUrl: { type: String, default: null },
		role: { type: String, enum: ["user", "caretaker", "admin"], default: "user" },
	},
	{ discriminatorKey: "role", collection: "users" }
);

export const baseUserModel = model<BaseUserDocument>("BaseUser", baseUserSchema);
