import { IResponses } from "../utils/base-schema";

export const eventResponses: IResponses = {
	SERVER_ERR: {
		statusCode: 500,
		message: "EVENT: SERVER ERR",
	},
	NOT_FOUND: {
		statusCode: 404,
		message: "EVENT: NOT FOUND",
	},
	UPDATE_FAILED: {
		statusCode: 400,
		message: "EVENT: UPDATE FAILED",
	},
	UPDATE_SUCCESSFUL: {
		statusCode: 200,
		message: "EVENT: UPDATE SUCCESSFUL",
	},
	CANNOT_UPDATE: {
		statusCode: 400,
		message: "EVENT: CANNOT UPDATE",
	},
	DELETE_FAILED: {
		statusCode: 400,
		message: "EVENT: DELETE FAILED",
	},
	DELETE_SUCCESSFUL: {
		statusCode: 200,
		message: "EVENT: DELETE SUCCESSFUL",
	},
	INSERT_FAILED: {
		statusCode: 400,
		message: "EVENT: INSERT FAILED",
	},
	INSERT_SUCCESSFUL: {
		statusCode: 200,
		message: "EVENT: INSERT SUCCESSFUL",
	},
	ALREADY_REGISTERED: {
		statusCode: 403,
		message: "EVENT: USER ALREADY REGISTERED",
	},
	REGISTERED_SUCCESSFULLY: {
		statusCode: 200,
		message: "EVENT: USER SUCCESSFULLY REGISTERED",
	},
	REGISTERED_FAILED: {
		statusCode: 400,
		message: "EVENT: USER FAILED REGISTERED",
	},
};
