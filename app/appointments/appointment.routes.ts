import { Router } from "express";

import { Route } from "../routes/routes.types";
import { ResponseHandler } from "../utils/response-handler";

import appointmentServices from "./appointment.services";

const router = Router();

router.get("/:id?", async (req, res, next) => {
	try {
		const { id } = req.params;
		const params = id ? { _id: id } : {};
		const result = await appointmentServices.find(params);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const data = req.body;
		const insertMethod = Array.isArray(data) ? "insertMany" : "insertOne";
		const result = await appointmentServices[insertMethod](data);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

router.patch("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await appointmentServices.findOneAndUpdate({ _id: id }, req.body);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

router.delete("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await appointmentServices.deleteOne({ _id: id });
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

export default new Route("/api/appointment", router);
