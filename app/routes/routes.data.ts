import { match } from "path-to-regexp";

import userRoutes from "../users/user.routes";
import authRoutes from "../auth/auth.routes";

import { ExcludedRoutes, Route } from "./routes.types";

export const routes: Route[] = [userRoutes, authRoutes];

export const excludedRoutes: ExcludedRoutes = [
	{ path: match("/api/auth/google"), method: "GET" },
	{ path: match("/api/auth/google/callback"), method: "GET" },
];
