import { match } from "path-to-regexp";

import userRoutes from "../users/user.routes";
import authRoutes from "../auth/auth.routes";
import moduleRoutes from "../modules/module.routes";

import { ExcludedRoutes, Route } from "./routes.types";

export const routes: Route[] = [
	userRoutes,
	authRoutes,
	moduleRoutes,
];

export const excludedRoutes: ExcludedRoutes = [{ path: match("/api/auth/google"), method: "POST" }];
