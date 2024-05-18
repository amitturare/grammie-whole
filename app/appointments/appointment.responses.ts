import { IAppointmentResponses } from "./appointment.types";

export const appointmentResponses: IAppointmentResponses = {
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
		statusCode: 400,
		message: "APPOINTMENT: UPDATE SUCCESSFUL",
	},
	DELETE_FAILED: {
		statusCode: 400,
		message: "APPOINTMENT: DELETE FAILED",
	},
	DELETE_SUCCESSFUL: {
		statusCode: 400,
		message: "APPOINTMENT: DELETE SUCCESSFUL",
	},
	INSERT_FAILED: {
		statusCode: 400,
		message: "APPOINTMENT: INSERT FAILED",
	},
};
