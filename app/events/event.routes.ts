import { Types } from "mongoose";
import { Router } from "express";

import { Route } from "../routes/routes.types";
import { ResponseHandler } from "../utils/response-handler";
import { permit } from "../utils/authorization";

import eventServices from "./event.services";

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		const result = await eventServices.find({});
		res.send(new ResponseHandler(result));
	} catch (error) {
		next(error);
	}
});

router.get("/user/:userId", async (req, res, next) => {
	try {
		const { userId } = req.params;
		const result = await eventServices.findOneByUserId(userId);
		res.send(new ResponseHandler(result));
	} catch (error) {
		next(error);
	}
});

router.get("/:eventId", async (req, res, next) => {
	try {
		const { eventId } = req.params;
		const result = await eventServices.findOneById(eventId);
		res.send(new ResponseHandler(result));
	} catch (error) {
		next(error);
	}
});

// without participants
router.post("/", async (req, res, next) => {
	try {
		const data = req.body;
		const result = await eventServices.insertOne(req.currUser.id, data);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

// participants can't be edited
router.patch("/:eventId", async (req, res, next) => {
	try {
		const { eventId } = req.params;
		const result = await eventServices.findOneAndUpdate(eventId, req.body);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

router.patch("/:eventId/enroll", async (req, res, next) => {
	try {
		const { eventId } = req.params;
		const result = await eventServices.insertParticipant(eventId, req.currUser.id);
		res.send(new ResponseHandler(result));  
	} catch (e) {
		next(e);
	}
});

router.delete("/:eventId", async (req, res, next) => {
	try {
		const { eventId } = req.params;
		const result = await eventServices.deleteOne(eventId);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

export default new Route("/api/event", router);
