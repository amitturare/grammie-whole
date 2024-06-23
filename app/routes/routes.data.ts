import { match } from "path-to-regexp";

import authRoutes from "../auth/auth.routes";
import userRoutes from "../users/user.routes";
import eventRoutes from "../events/event.routes";

import { ExcludedRoutes, Route } from "./routes.types";

export const routes: Route[] = [authRoutes, userRoutes, eventRoutes];

export const excludedRoutes: ExcludedRoutes = [
	{ path: match("/api/auth/google"), method: "GET" },
	{ path: match("/api/auth/google/callback"), method: "GET" },
];
