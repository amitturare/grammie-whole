import { Application, json, Request, Response, NextFunction, urlencoded } from "express";
import cors from "cors";

import { excludedRoutes, routes } from "./routes.data";
import { ResponseHandler } from "../utils/response-handler";
import { validateToken } from "../utils/authorization";

export const registerMiddlewares = (app: Application) => {
	const corsOptions = {
		origin: "*",
	};
	app.use(cors(corsOptions));
	app.use(json());
	app.use(urlencoded({ extended: true }));

	app.use(validateToken(excludedRoutes));

	for (let route of routes) {
		app.use(route.path, route.router);
	}

	app.use((err: any, req: Request, res: Response, next: NextFunction) => {
		res.status(err.statusCode || 500).send(new ResponseHandler(null, err));
	});
};


/*
user amit.turare@coditas.com 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzViNGQ1MzE5YTViZTI1OWEwMWQxZSIsImVtYWlsIjoiYW1pdC50dXJhcmVAY29kaXRhcy5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTcxOTE2NDAzOX0.xs7-y3rfoviwtxHjYqC2IVnXBMyECq_xzMxlZeZGG3w

user sunidhichopada18@gmail.com
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzViNTAwMzE5YTViZTI1OWEwMWQyNCIsImVtYWlsIjoic3VuaWRoaWNob3BhZGExOEBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTcxODk5MDA4MH0.kfp82fRC8myj-K2aszb1_qT1FHKn7uSoB71EEYYLW6Q

careTaker amitturare18@gmail.com
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzViNGVmMzE5YTViZTI1OWEwMWQyMSIsImVtYWlsIjoiYW1pdHR1cmFyZTE4QGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE4OTkwMDYzfQ.8xQHRbe0ZNtvO1smi4pFTxG96-n1bbLlDAv8UpNN_ck

*/