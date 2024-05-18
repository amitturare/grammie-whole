import { appointmentModel } from "./appointment.schema";

import { IAppointment } from "./appointment.types";

const find = async (query: Partial<IAppointment>) => await appointmentModel.find(query);

const findOne = async (query: Partial<IAppointment>) => await appointmentModel.findOne(query);

const insertOne = async (helper: IAppointment) => await appointmentModel.create(helper);

const insertMany = async (helpers: IAppointment[]) => await appointmentModel.insertMany(helpers);

const findOneAndUpdate = async (findQuery: Partial<IAppointment>, updateObj: Partial<IAppointment>) =>
	await appointmentModel.findOneAndUpdate(findQuery, updateObj);

export default {
	find,
	findOne,
	insertOne,
	insertMany,
	findOneAndUpdate,
};
