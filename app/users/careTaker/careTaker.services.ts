import { ICareTakerRegister } from "./careTaker.types";
import { careTakerResponses } from "./careTaker.responses";

import userServices from "../user.services";

const register = async (email: string, data: ICareTakerRegister, aadharCardImageUrl: string | undefined) => {
	try {
		if (!aadharCardImageUrl) throw careTakerResponses.REGISTRATION_DATA_UNAVAILABLE;
		const registeredData = await userServices.findOneAndUpdate(
			{ email },
			{
				...data,
				aadharCardImageUrl,
				role: "careTaker",
			}
		);
		if (!registeredData) throw careTakerResponses.REGISTRATION_FAILED;
		return careTakerResponses.REGISTRATION_SUCCESSFUL;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw careTakerResponses.SERVER_ERR;
	}
};

export default {
	register,
};
