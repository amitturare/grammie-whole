import { match } from "path-to-regexp";

import userRoutes from "../users/user.routes";
import helperRoutes from "../helpers/helper.routes";
import authRoutes from "../auth/auth.routes";
import reviewRoutes from "../reviews/review.routes";
import appointmentRoutes from "../appointments/appointment.routes";

import { ExcludedRoutes, Route } from "./routes.types";

export const routes: Route[] = [userRoutes, helperRoutes, authRoutes, reviewRoutes, appointmentRoutes];

export const excludedRoutes: ExcludedRoutes = [
	{ path: match("/auth/login"), method: "POST" },
	{ path: match("/auth/signup"), method: "POST" },
];
