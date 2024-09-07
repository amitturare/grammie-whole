import { Types } from "mongoose";
import { Router } from "express";

import { Route } from "../routes/routes.types";
import { ResponseHandler } from "../utils/response-handler";
import { permit } from "../utils/authorization";

import reviewServices from "./review.services";

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		const result = await reviewServices.find({});
		res.send(new ResponseHandler(result));
	} catch (error) {
		next(error);
	}
});

router.get("/user/:userId", async (req, res, next) => {
	try {
		const { userId } = req.params;
		const result = await reviewServices.findOneByUserId(userId);
		res.send(new ResponseHandler(result));
	} catch (error) {
		next(error);
	}
});

router.get("/careTaker/:careTakerId", async (req, res, next) => {
	try {
		const { careTakerId } = req.params;
		const result = await reviewServices.findOneByCareTakerId(careTakerId);
		res.send(new ResponseHandler(result));
	} catch (error) {
		next(error);
	}
});

router.get("/:reviewId", async (req, res, next) => {
	try {
		const { reviewId } = req.params;
		const result = await reviewServices.findOneById(reviewId);
		res.send(new ResponseHandler(result));
	} catch (error) {
		next(error);
	}
});

router.post("/:careTakerId", async (req, res, next) => {
	try {
		const data = req.body;
		const { careTakerId } = req.params;
		const result = await reviewServices.insertOne(req.currUser.id, careTakerId, data);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

router.patch("/:reviewId", async (req, res, next) => {
	try {
		const data = req.body;
		const { reviewId } = req.params;
		const result = await reviewServices.findOneAndUpdate(reviewId, data);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

router.delete("/:reviewId", async (req, res, next) => {
	try {
		const { reviewId } = req.params;
		const result = await reviewServices.deleteOne(reviewId);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

export default new Route("/api/review", router);
