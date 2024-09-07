import { IResponses } from "../utils/base-schema";

export const userResponses: IResponses = {
	SERVER_ERR: {
		statusCode: 500,
		message: "USER: SERVER ERR",
	},
	NOT_FOUND: {
		statusCode: 404,
		message: "USER: NOT FOUND",
	},
	UPDATE_FAILED: {
		statusCode: 400,
		message: "USER: UPDATE FAILED",
	},
	UPDATE_SUCCESSFUL: {
		statusCode: 200,
		message: "USER: UPDATE SUCCESSFUL",
	},
	DELETE_FAILED: {
		statusCode: 400,
		message: "USER: DELETE FAILED",
	},
	DELETE_SUCCESSFUL: {
		statusCode: 200,
		message: "USER: DELETE SUCCESSFUL",
	},
	INSERT_FAILED: {
		statusCode: 400,
		message: "USER: INSERT FAILED",
	},
	INSERT_SUCCESSFUL: {
		statusCode: 200,
		message: "USER: INSERT SUCCESSFUL",
	},
};
