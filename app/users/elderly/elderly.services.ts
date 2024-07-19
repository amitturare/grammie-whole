import { IElderlyRegister } from "./elderly.types";
import { elderlyResponses } from "./elderly.responses";

import userServices from "../user.services";
import appointmentServices from "../../appointments/appointment.services";
import eventServices from "../../events/event.services";

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

const getUserDash = async (id: string) => {
	try {
		const user = await userServices.findOneById(id);
		const appointments = await appointmentServices.find({ userId: user._id, status: "accepted" });
		const attendingEvents = await eventServices.findEventsForUser(id, true);

		return { user, appointments, attendingEvents };
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw elderlyResponses.SERVER_ERR;
	}
};

export default {
	getUserDash,
	register,
};
