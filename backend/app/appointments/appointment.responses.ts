import { IResponses } from "../utils/base-schema";

export const appointmentResponses: IResponses = {
	SERVER_ERR: {
		statusCode: 500,
		message: "APPOINTMENT: SERVER ERR",
	},
	NOT_FOUND: {
		statusCode: 404,
		message: "APPOINTMENT: NOT FOUND",
	},
	UPDATE_FAILED: {
		statusCode: 400,
		message: "APPOINTMENT: UPDATE FAILED",
	},
	UPDATE_SUCCESSFUL: {
		statusCode: 200,
		message: "APPOINTMENT: UPDATE SUCCESSFUL",
	},
	CANNOT_UPDATE: {
		statusCode: 400,
		message: "APPOINTMENT: CANNOT UPDATE",
	},
	DELETE_FAILED: {
		statusCode: 400,
		message: "APPOINTMENT: DELETE FAILED",
	},
	DELETE_SUCCESSFUL: {
		statusCode: 200,
		message: "APPOINTMENT: DELETE SUCCESSFUL",
	},
	INSERT_FAILED: {
		statusCode: 400,
		message: "APPOINTMENT: INSERT FAILED",
	},
	INSERT_SUCCESSFUL: {
		statusCode: 200,
		message: "APPOINTMENT: INSERT SUCCESSFUL",
	},
	ALREADY_EXISTS: {
		statusCode: 409,
		message: "APPOINTMENT: ALREADY EXISTS",
	},
};
