import { Router } from "express";

import { Route } from "../routes/routes.types";
import { ResponseHandler } from "../utils/response-handler";
import { permit } from "../utils/authorization";

import userServices from "./user.services";

import careTakerRoutes from "./careTaker/careTaker.routes";
import elderlyUserRoutes from "./elderly/elderly.routes";

const router = Router();

router.use("/careTaker", careTakerRoutes);
router.use("/elderlyUser", elderlyUserRoutes);

router.get("/", async (req, res, next) => {
	try {
		// const page = Number(req.params.page);
		// const limit = Number(req.params.limit);
		// const { status, searchQuery, designation, department } = req.query;
		// const queryObject = {
		// 	page,
		// 	limit,
		// 	searchQuery,
		// 	filters: { designation, department },
		// };

		const result = await userServices.find({});
		res.send(new ResponseHandler(result));
	} catch (error) {
		next(error);
	}
});

router.get("/:userId", async (req, res, next) => {
	try {
		const { userId } = req.params;
		const result = await userServices.findOneById(userId);
		res.send(new ResponseHandler(result));
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const data = req.body;
		const result = await userServices.insertOne(data);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

router.patch("/:userId", async (req, res, next) => {
	try {
		const { userId } = req.params;
		const result = await userServices.findOneAndUpdate(userId, req.body);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

router.delete("/:userId", async (req, res, next) => {
	try {
		const { userId } = req.params;
		const result = await userServices.deleteOne(userId);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

export default new Route("/api/user", router);
