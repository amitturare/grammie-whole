import { Types } from "mongoose";

import { appointmentModel } from "./appointment.schema";

import { IAppointment } from "./appointment.types";

const find = async (query: Partial<IAppointment>) => await appointmentModel.find({ ...query, isDeleted: false });

const findOne = async (query: Partial<IAppointment>) => await appointmentModel.findOne({ ...query, isDeleted: false });

const findOneById = async (appointmentId: Types.ObjectId) =>
	await appointmentModel.findOne({ _id: appointmentId, isDeleted: false });

const findByUserId = async (userId: Types.ObjectId) => await appointmentModel.find({ userId, isDeleted: false }).populate("caretakerId");

const findByCareTakerId = async (caretakerId: Types.ObjectId) =>
	await appointmentModel.findOne({ caretakerId, isDeleted: false });

const insertOne = async (appointment: Partial<IAppointment>) => await appointmentModel.create(appointment);

const findOneAndUpdate = async (query: Partial<IAppointment>, updateObj: Partial<IAppointment>) =>
	await appointmentModel.findOneAndUpdate(query, updateObj);

export default {
	find,
	findOne,
	findOneById,
	findByUserId,
	findByCareTakerId,
	insertOne,
	findOneAndUpdate,
};
