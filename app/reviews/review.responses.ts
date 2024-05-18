import { IReviewResponses } from "./review.types";

export const reviewResponses: IReviewResponses = {
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
		statusCode: 400,
		message: "REVIEW: UPDATE SUCCESSFUL",
	},
	DELETE_FAILED: {
		statusCode: 400,
		message: "REVIEW: DELETE FAILED",
	},
	DELETE_SUCCESSFUL: {
		statusCode: 400,
		message: "REVIEW: DELETE SUCCESSFUL",
	},
	INSERT_FAILED: {
		statusCode: 400,
		message: "REVIEW: INSERT FAILED",
	},
};
