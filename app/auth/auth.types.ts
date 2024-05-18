import { z } from "zod";

import { IUser, IUserResponses, user } from "../users/user.types";

export const Credentials = user.pick({ username: true, password: true });
export interface ICredentials extends Pick<IUser, "username" | "password"> {}

export const UserSignupData = user.pick({ username: true, password: true, role: true });
export interface SignupData extends z.infer<typeof UserSignupData> {}

export interface IAuthResponses extends IUserResponses {}
