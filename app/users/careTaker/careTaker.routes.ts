import { Router } from "express";

import { ResponseHandler } from "../../utils/response-handler";
import { permit } from "../../utils/authorization";

import careTaker from "./careTaker.services";

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		const result = await careTaker.find({});
		res.send(new ResponseHandler(result));
	} catch (error) {
		next(error);
	}
});

router.get("/:userId", async (req, res, next) => {
	try {
		const { userId } = req.params;
		const result = await careTaker.findOneById(userId);
		res.send(new ResponseHandler(result));
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const data = req.body;
		const result = await careTaker.insertOne(data);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

router.patch("/:userId", async (req, res, next) => {
	try {
		const { userId } = req.params;
		const result = await careTaker.findOneAndUpdate(userId, req.body);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

router.delete("/:userId", async (req, res, next) => {
	try {
		const { userId } = req.params;
		const result = await careTaker.deleteOne(userId);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

export default router;
