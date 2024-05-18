import { model, Document } from "mongoose";
import { BaseSchema } from "../utils/base-schema";

import { UserDocument } from "./user.types";

const userSchema = new BaseSchema({
	role: { type: String, require: true, default: "user" },
	username: { type: String, require: true },
	password: { type: String, require: true },
});

export const userModel = model<UserDocument>("users", userSchema);
