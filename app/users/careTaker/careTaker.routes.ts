import { Router } from "express";

import { ResponseHandler } from "../../utils/response-handler";
import { permit } from "../../utils/authorization";

import careTakerServices from "./careTaker.services";
import { upload } from "../../utils/file-uploader";

const router = Router();

router.post("/register", upload.single("aadharCardImageUrl"), async (req, res, next) => {
	try {
		const result = await careTakerServices.register(req.currUser.email, req.body, req.file?.path);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

export default router;
