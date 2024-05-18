import helperRepo from "./helper.repo";

import { IHelper } from "./helper.types";
import { helperResponses } from "./helper.responses";

import userServices from "../users/user.services";
import { userResponses } from "../users/user.responses";

import reviewServices from "../reviews/review.services";
import appointmentServices from "../appointments/appointment.services";

const find = async (query: Partial<IHelper>) => await helperRepo.find(query);

const findOne = async (query: Partial<IHelper>) => {
	try {
		const result = await helperRepo.findOne(query);
		return result;
	} catch (error: any) {
		if (error.statusCode) throw helperResponses.NOT_FOUND;
		throw helperResponses.SERVER_ERR;
	}
};

const insertOne = async (data: IHelper) => {
	try {
		const result = await helperRepo.insertOne(data);
		return result;
	} catch (error: any) {
		if (error.statusCode) throw helperResponses.INSERT_FAILED;
		throw helperResponses.SERVER_ERR;
	}
};

const insertMany = async (data: IHelper[]) => {
	try {
		const result = await helperRepo.insertMany(data);
		return result;
	} catch (error: any) {
		if (error.statusCode) throw helperResponses.INSERT_FAILED;
		throw helperResponses.SERVER_ERR;
	}
};

const findOneAndUpdate = async (findQuery: Partial<IHelper>, updateObj: Partial<IHelper>) => {
	try {
		const result = await helperRepo.findOneAndUpdate(findQuery, updateObj);
		return helperResponses.UPDATE_SUCCESSFUL;
	} catch (error: any) {
		if (error.statusCode) throw helperResponses.UPDATE_FAILED;
		throw helperResponses.SERVER_ERR;
	}
};

const deleteOne = async (query: Partial<IHelper>) => {
	try {
		const result = await helperRepo.findOneAndUpdate(query, { isDeleted: true });
		return helperResponses.DELETE_SUCCESSFUL;
	} catch (error: any) {
		if (error.statusCode) throw helperResponses.DELETE_FAILED;
		throw helperResponses.SERVER_ERR;
	}
};

const addReview = async (helperId: string, username: string, review: { rating: number; feedback: string }) => {
	try {
		const helper = await helperRepo.findOne({ _id: helperId, isDeleted: false });
		if (!helper) throw helperResponses.NOT_FOUND;

		const findReviewQuery = { user: username, helper: helper.name, isDeleted: false };
		const alreadyReviewed = await reviewServices.findOne(findReviewQuery);
		if (alreadyReviewed) {
			const updateReviewed = await reviewServices.findOneAndUpdate(findReviewQuery, review);
			if (!updateReviewed) throw helperResponses.REVIEW_UPDATE_FAILED;
			return helperResponses.REVIEW_UPDATE_SUCCESSFUL;
		}

		const result = await reviewServices.insertOne({ helper: helper.name, user: username, ...review });
		return helperResponses.REVIEW_INSERT_SUCCESSFUL;
	} catch (error: any) {
		if (error.statusCode) throw helperResponses.REVIEW_INSERT_FAILED;
		throw helperResponses.SERVER_ERR;
	}
};

const createAppointment = async (helperId: string, username: string, dateTime: Date) => {
	try {
		const helper = await helperRepo.findOne({ _id: helperId, isDeleted: false });
		if (!helper) throw helperResponses.NOT_FOUND;

		const findAppointmentQuery = { user: username, helper: helper.name, isDeleted: false };
		const alreadyAppointed = await appointmentServices.findOne(findAppointmentQuery);
		if (alreadyAppointed) {
			const updatedAppointment = await appointmentServices.findOneAndUpdate(findAppointmentQuery, { dateTime });
			if (!updatedAppointment) throw helperResponses.APPOINTMENT_UPDATE_FAILED;
			return helperResponses.APPOINTMENT_UPDATE_SUCCESSFUL;
		}

		const result = await appointmentServices.insertOne({ helper: helper.name, user: username, dateTime });
		return helperResponses.APPOINTMENT_CREATION_SUCCESSFUL;
	} catch (error: any) {
		if (error.statusCode) throw helperResponses.APPOINTMENT_CREATION_FAILED;
		throw helperResponses.SERVER_ERR;
	}
};

export default {
	find,
	findOne,
	insertOne,
	insertMany,
	findOneAndUpdate,
	deleteOne,
	addReview,
	createAppointment,
};
