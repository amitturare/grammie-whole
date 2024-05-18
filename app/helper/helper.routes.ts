import { Router } from "express";

import { Route } from "../routes/routes.types";
import { ResponseHandler } from "../utils/response-handler";

import helperServices from "./helper.services";

const router = Router();

router.get("/:id?", async (req, res, next) => {
	try {
		const { id } = req.params;
		const params = id ? { _id: id } : {};
		const result = await helperServices.find(params);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const data = req.body;
		const insertMethod = Array.isArray(data) ? "insertMany" : "insertOne";
		const result = await helperServices[insertMethod](data);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

router.patch("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await helperServices.findOneAndUpdate({ _id: id }, req.body);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

router.delete("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await helperServices.deleteOne({ _id: id });
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

export default new Route("/api/helper", router);
