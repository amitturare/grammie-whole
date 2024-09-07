import { IResponses } from "../utils/base-schema";

export const reviewResponses: IResponses = {
	SERVER_ERR: {
		statusCode: 500,
		message: "REVIEW: SERVER ERR",
	},
	NOT_FOUND: {
		statusCode: 404,
		message: "REVIEW: NOT FOUND",
	},
	UPDATE_FAILED: {
		statusCode: 400,
		message: "REVIEW: UPDATE FAILED",
	},
	UPDATE_SUCCESSFUL: {
		statusCode: 200,
		message: "REVIEW: UPDATE SUCCESSFUL",
	},
	CANNOT_UPDATE: {
		statusCode: 400,
		message: "REVIEW: CANNOT UPDATE",
	},
	DELETE_FAILED: {
		statusCode: 400,
		message: "REVIEW: DELETE FAILED",
	},
	DELETE_SUCCESSFUL: {
		statusCode: 200,
		message: "REVIEW: DELETE SUCCESSFUL",
	},
	INSERT_FAILED: {
		statusCode: 400,
		message: "REVIEW: INSERT FAILED",
	},
	INSERT_SUCCESSFUL: {
		statusCode: 200,
		message: "REVIEW: INSERT SUCCESSFUL",
	},
	ALREADY_EXISTS: {
		statusCode: 409,
		message: "REVIEW: ALREADY EXISTS",
	},
};
