import { Router } from "express";

import { ResponseHandler } from "../../utils/response-handler";
import { permit } from "../../utils/authorization";
import { upload } from "../../utils/file-uploader";

import elderlyServices from "./elderly.services";

const router = Router();

router.patch("/register", upload.single("aadharCardImageUrl"), async (req, res, next) => {
	try {
		const result = await elderlyServices.register(req.currUser.email, req.body, req.file?.path);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

export default router;
