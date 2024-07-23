import { ICareTakerRegister } from "./careTaker.types";
import { careTakerResponses } from "./careTaker.responses";

import userServices from "../user.services";
import appointmentServices from "../../appointments/appointment.services";
import reviewServices from "../../reviews/review.services";

const find = async () => {
	try {
		return await userServices.findCareTakerWithReviews();
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw careTakerResponses.SERVER_ERR;
	}
};

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

const getCareTakerDash = async (id: string) => {
	try {
		const careTaker = await userServices.findOneById(id);
		const activeAppointments = await appointmentServices.find({
			caretakerId: careTaker._id,
			status: "accepted",
			isTerminated: false,
		});
		const totalAppointments = await appointmentServices.find({ caretakerId: careTaker._id });
		const averageRating = await reviewServices.findAvgRatingForCareTaker(id);

		return {
			careTaker,
			activeAppointments: activeAppointments.length,
			totalAppointments: totalAppointments.length,
			averageRating,
		};
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw careTakerResponses.SERVER_ERR;
	}
};

export default {
	find,
	register,
	getCareTakerDash,
};
