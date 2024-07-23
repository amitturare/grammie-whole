import { Types } from "mongoose";

import appointmentRepo from "./appointment.repo";
import { sanitizeQueryObject } from "../utils/sanitize-queries";

import { IAppointment, IAppointmentCreation } from "./appointment.types";
import { appointmentResponses } from "./appointment.responses";

const find = async (query: Partial<IAppointment>) => await appointmentRepo.find(query);

const findOne = async (query: Partial<IAppointment>, safe: boolean = false) => {
	try {
		const result = await appointmentRepo.findOne(query);

		if (safe) return result;

		if (!result) throw appointmentResponses.NOT_FOUND;
		return result;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw appointmentResponses.SERVER_ERR;
	}
};

const findOneById = async (appointmentId: string) => {
	try {
		const result = await appointmentRepo.findOneById(new Types.ObjectId(appointmentId));
		if (!result) throw appointmentResponses.NOT_FOUND;
		return result;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw appointmentResponses.SERVER_ERR;
	}
};

const findByUserId = async (userId: string) => {
	try {
		const result = await appointmentRepo.findByUserId(new Types.ObjectId(userId));
		if (!result) throw appointmentResponses.NOT_FOUND;
		return result;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw appointmentResponses.SERVER_ERR;
	}
};

const findByCareTakerId = async (caretakerId: string, status: "accepted" | "rejected" | "pending") => {
	try {
		const result = await find({
			caretakerId: new Types.ObjectId(caretakerId),
			status,
		});
		if (!result) throw appointmentResponses.NOT_FOUND;
		return result;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw appointmentResponses.SERVER_ERR;
	}
};

const findAllTerminatedByCareTakerId = async (caretakerId: string) => {
	try {
		const result = await find({
			caretakerId: new Types.ObjectId(caretakerId),
			isTerminated: true,
		});
		if (!result) throw appointmentResponses.NOT_FOUND;
		return result;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw appointmentResponses.SERVER_ERR;
	}
};

const insertOne = async (currUserId: string, caretakerId: string, data: IAppointmentCreation) => {
	try {
		const appointment = await findOne(
			{
				userId: new Types.ObjectId(currUserId),
				caretakerId: new Types.ObjectId(caretakerId),
			},
			true
		);
		if (appointment) throw appointmentResponses.ALREADY_EXISTS;

		const result = await appointmentRepo.insertOne({
			...data,
			userId: new Types.ObjectId(currUserId),
			caretakerId: new Types.ObjectId(caretakerId),
			dateTime: new Date(data.dateTime),
		});
		if (!result) throw appointmentResponses.INSERT_FAILED;
		return result;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw appointmentResponses.SERVER_ERR;
	}
};

const findOneAndUpdate = async (appointmentId: string, updateObj: Partial<IAppointment>) => {
	try {
		const result = await appointmentRepo.findOneAndUpdate({ _id: new Types.ObjectId(appointmentId) }, updateObj);
		if (!result) throw appointmentResponses.UPDATE_FAILED;
		return appointmentResponses.UPDATE_SUCCESSFUL;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw appointmentResponses.SERVER_ERR;
	}
};

const findOneAndUpdateStatus = async (appointmentId: string, status: "accepted" | "rejected") => {
	try {
		const result = await appointmentRepo.findOneAndUpdate({ _id: new Types.ObjectId(appointmentId) }, { status });
		if (!result) throw appointmentResponses.UPDATE_FAILED;
		return appointmentResponses.UPDATE_SUCCESSFUL;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw appointmentResponses.SERVER_ERR;
	}
};

const findOneAndUpdateIsTerminated = async (appointmentId: string) => {
	try {
		const result = await appointmentRepo.findOneAndUpdate(
			{ _id: new Types.ObjectId(appointmentId) },
			{ isTerminated: true }
		);
		if (!result) throw appointmentResponses.UPDATE_FAILED;
		return appointmentResponses.UPDATE_SUCCESSFUL;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw appointmentResponses.SERVER_ERR;
	}
};

const deleteOne = async (appointmentId: string) => {
	try {
		const result = await appointmentRepo.findOneAndUpdate(
			{ _id: new Types.ObjectId(appointmentId) },
			{ isDeleted: true }
		);
		if (!result) throw appointmentResponses.DELETE_FAILED;
		return appointmentResponses.DELETE_SUCCESSFUL;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw appointmentResponses.SERVER_ERR;
	}
};

export default {
	find,
	findOne,
	findOneById,
	findByUserId,
	findByCareTakerId,
	findAllTerminatedByCareTakerId,
	insertOne,
	findOneAndUpdate,
	findOneAndUpdateStatus,
	findOneAndUpdateIsTerminated,
	deleteOne,
};
