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
};
