import { Types } from "mongoose";
import { Router } from "express";

import { Route } from "../routes/routes.types";
import { ResponseHandler } from "../utils/response-handler";
import { permit } from "../utils/authorization";

import appointmentServices from "./appointment.services";

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		const result = await appointmentServices.find({});
		res.send(new ResponseHandler(result));
	} catch (error) {
		next(error);
	}
});

router.get("/user/curr", async (req, res, next) => {
	try {
		const { currUser } = req;
		const result = await appointmentServices.findByUserId(currUser.id);
		res.send(new ResponseHandler(result));
	} catch (error) {
		next(error);
	}
});

router.get("/careTaker/curr", async (req, res, next) => {
	try {
		const { currUser } = req;
		const { status } = req.query;
		const result = await appointmentServices.findByCareTakerId(
			currUser.id,
			status as "accepted" | "rejected" | "pending"
		);
		res.send(new ResponseHandler(result));
	} catch (error) {
		next(error);
	}
});

router.get("/careTaker/terminated", async (req, res, next) => {
	try {
		const { currUser } = req;
		const result = await appointmentServices.findAllTerminatedByCareTakerId(currUser.id);
		res.send(new ResponseHandler(result));
	} catch (error) {
		next(error);
	}
});

router.get("/:appointmentId", async (req, res, next) => {
	try {
		const { appointmentId } = req.params;
		const result = await appointmentServices.findOneById(appointmentId);
		res.send(new ResponseHandler(result));
	} catch (error) {
		next(error);
	}
});

router.post("/:careTakerId", permit(["user"]), async (req, res, next) => {
	try {
		const data = req.body;
		const { careTakerId } = req.params;
		const result = await appointmentServices.insertOne(req.currUser.id, careTakerId, data);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

router.patch("/updateStatus/:appointmentId", async (req, res, next) => {
	try {
		const { status } = req.body;
		const { appointmentId } = req.params;
		const result = await appointmentServices.findOneAndUpdateStatus(appointmentId, status);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

router.patch("/terminate/:appointmentId", async (req, res, next) => {
	try {
		const { status } = req.body;
		const { appointmentId } = req.params;
		const result = await appointmentServices.findOneAndUpdateIsTerminated(appointmentId);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

router.delete("/:appointmentId", permit(["user"]), async (req, res, next) => {
	try {
		const { appointmentId } = req.params;
		const result = await appointmentServices.deleteOne(appointmentId);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

export default new Route("/api/appointment", router);
