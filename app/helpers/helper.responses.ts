import { IHelperResponses } from "./helper.types";

export const helperResponses: IHelperResponses = {
	SERVER_ERR: {
		statusCode: 500,
		message: "HELPER: SERVER ERR",
	},
	NOT_FOUND: {
		statusCode: 404,
		message: "HELPER: NOT FOUND",
	},
	UPDATE_FAILED: {
		statusCode: 400,
		message: "HELPER: UPDATE FAILED",
	},
	UPDATE_SUCCESSFUL: {
		statusCode: 400,
		message: "HELPER: UPDATE SUCCESSFUL",
	},
	DELETE_FAILED: {
		statusCode: 400,
		message: "HELPER: DELETE FAILED",
	},
	DELETE_SUCCESSFUL: {
		statusCode: 400,
		message: "HELPER: DELETE SUCCESSFUL",
	},
	INSERT_FAILED: {
		statusCode: 400,
		message: "HELPER: INSERT FAILED",
	},
	REVIEW_INSERT_SUCCESSFUL: {
		statusCode: 200,
		message: "REVIEW: INSERTED SUCCESSFULLY",
	},
	REVIEW_INSERT_FAILED: {
		statusCode: 400,
		message: "REVIEW: INSERT FAILED",
	},
	REVIEW_UPDATE_SUCCESSFUL: {
		statusCode: 200,
		message: "REVIEW: UPDATED SUCCESSFULLY",
	},
	REVIEW_UPDATE_FAILED: {
		statusCode: 400,
		message: "REVIEW: UPDATE FAILED",
	},
};
