import { IResponses } from "../../utils/base-schema";

export const careTakerResponses: IResponses = {
	SERVER_ERR: {
		statusCode: 500,
		message: "CARETAKER: SERVER ERR",
	},
	NOT_FOUND: {
		statusCode: 404,
		message: "CARETAKER: NOT FOUND",
	},
	UPDATE_FAILED: {
		statusCode: 400,
		message: "CARETAKER: UPDATE FAILED",
	},
	UPDATE_SUCCESSFUL: {
		statusCode: 200,
		message: "CARETAKER: UPDATE SUCCESSFUL",
	},
	DELETE_FAILED: {
		statusCode: 400,
		message: "CARETAKER: DELETE FAILED",
	},
	DELETE_SUCCESSFUL: {
		statusCode: 200,
		message: "CARETAKER: DELETE SUCCESSFUL",
	},
	INSERT_FAILED: {
		statusCode: 400,
		message: "CARETAKER: INSERT FAILED",
	},
	INSERT_SUCCESSFUL: {
		statusCode: 200,
		message: "CARETAKER: INSERT SUCCESSFUL",
	},
};
