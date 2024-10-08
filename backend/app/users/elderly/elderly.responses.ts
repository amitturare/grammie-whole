import { IResponses } from "../../utils/base-schema";

export const elderlyResponses: IResponses = {
	SERVER_ERR: {
		statusCode: 500,
		message: "ELDERLY: SERVER ERR",
	},
	REGISTRATION_DATA_UNAVAILABLE: {
		statusCode: 400,
		message: "ELDERLY: REGISTRATION DATA UNAVAILABLE",
	},
	REGISTRATION_FAILED: {
		statusCode: 400,
		message: "ELDERLY: REGISTRATION FAILED",
	},
	REGISTRATION_SUCCESSFUL: {
		statusCode: 200,
		message: "ELDERLY: REGISTRATION SUCCESSFUL",
	},
	NOT_FOUND: {
		statusCode: 404,
		message: "ELDERLY: NOT FOUND",
	},
	UPDATE_FAILED: {
		statusCode: 400,
		message: "ELDERLY: UPDATE FAILED",
	},
	UPDATE_SUCCESSFUL: {
		statusCode: 200,
		message: "ELDERLY: UPDATE SUCCESSFUL",
	},
	DELETE_FAILED: {
		statusCode: 400,
		message: "ELDERLY: DELETE FAILED",
	},
	DELETE_SUCCESSFUL: {
		statusCode: 200,
		message: "ELDERLY: DELETE SUCCESSFUL",
	},
	INSERT_FAILED: {
		statusCode: 400,
		message: "ELDERLY: INSERT FAILED",
	},
	INSERT_SUCCESSFUL: {
		statusCode: 200,
		message: "ELDERLY: INSERT SUCCESSFUL",
	},
};
