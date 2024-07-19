import { IElderlyRegister } from "./elderly.types";
import { elderlyResponses } from "./elderly.responses";

import userServices from "../user.services";

const register = async (email: string, data: IElderlyRegister, aadharCardImageUrl: string | undefined) => {
	try {
		if (!aadharCardImageUrl) throw elderlyResponses.REGISTRATION_DATA_UNAVAILABLE;

		const registeredData = await userServices.findOneAndUpdate(
			{ email },
			{ ...data, aadharCardImageUrl, role: "user" }
		);
		if (!registeredData) throw elderlyResponses.REGISTRATION_FAILED;
		return elderlyResponses.REGISTRATION_SUCCESSFUL;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw elderlyResponses.SERVER_ERR;
	}
};

export default {
	register,
};
