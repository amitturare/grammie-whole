import helperRepo from "./appointment.repo";

import { IAppointment } from "./appointment.types";
import { appointmentResponses } from "./appointment.responses";

const find = async (query: Partial<IAppointment>) => await helperRepo.find(query);

const findOne = async (query: Partial<IAppointment>) => {
	try {
		const result = await helperRepo.findOne(query);
		return result;
	} catch (error: any) {
		if (error.statusCode) throw appointmentResponses.NOT_FOUND;
		throw appointmentResponses.SERVER_ERR;
	}
};

const insertOne = async (data: IAppointment) => {
	try {
		const result = await helperRepo.insertOne(data);
		return result;
	} catch (error: any) {
		if (error.statusCode) throw appointmentResponses.INSERT_FAILED;
		throw appointmentResponses.SERVER_ERR;
	}
};

const insertMany = async (data: IAppointment[]) => {
	try {
		const result = await helperRepo.insertMany(data);
		return result;
	} catch (error: any) {
		if (error.statusCode) throw appointmentResponses.INSERT_FAILED;
		throw appointmentResponses.SERVER_ERR;
	}
};

const findOneAndUpdate = async (findQuery: Partial<IAppointment>, updateObj: Partial<IAppointment>) => {
	try {
		const result = await helperRepo.findOneAndUpdate(findQuery, updateObj);
		return appointmentResponses.UPDATE_SUCCESSFUL;
	} catch (error: any) {
		if (error.statusCode) throw appointmentResponses.UPDATE_FAILED;
		throw appointmentResponses.SERVER_ERR;
	}
};

const deleteOne = async (query: Partial<IAppointment>) => {
	try {
		const result = await helperRepo.findOneAndUpdate(query, { isDeleted: true });
		return appointmentResponses.DELETE_SUCCESSFUL;
	} catch (error: any) {
		if (error.statusCode) throw appointmentResponses.DELETE_FAILED;
		throw appointmentResponses.SERVER_ERR;
	}
};

export default {
	find,
	findOne,
	insertOne,
	insertMany,
	findOneAndUpdate,
	deleteOne,
};
