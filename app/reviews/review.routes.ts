import { Router } from "express";

import { Route } from "../routes/routes.types";
import { ResponseHandler } from "../utils/response-handler";

import reviewServices from "./review.services";

const router = Router();

router.get("/:id?", async (req, res, next) => {
	try {
		const { id } = req.params;
		const params = id ? { _id: id } : {};
		const result = await reviewServices.find(params);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

router.patch("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await reviewServices.findOneAndUpdate({ _id: id }, req.body);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

router.delete("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await reviewServices.deleteOne({ _id: id });
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

export default new Route("/user", router);
