import { Types } from "mongoose";

import careTakerRepo from "./careTaker.repo";
import { sanitizeQueryObject } from "../../utils/sanitize-queries";

import { ICareTaker } from "./careTaker.types";
import { careTakerResponses } from "./careTaker.responses";

const find = async (query: Partial<ICareTaker>) => await careTakerRepo.find(query);

const findOne = async (query: Partial<ICareTaker>) => {
	try {
		const result = await careTakerRepo.findOne(query);
		if (!result) throw careTakerResponses.NOT_FOUND;
		return result;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw careTakerResponses.SERVER_ERR;
	}
};

const findOneById = async (userId: string) => {
	try {
		const result = await careTakerRepo.findOneById(new Types.ObjectId(userId));
		if (!result) throw careTakerResponses.NOT_FOUND;
		return result;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw careTakerResponses.SERVER_ERR;
	}
};

const insertOne = async (data: ICareTaker) => {
	try {
		const result = await careTakerRepo.insertOne(data);
		if (!result) throw careTakerResponses.INSERT_FAILED;
		return result;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw careTakerResponses.SERVER_ERR;
	}
};

const findOneAndUpdate = async (userId: string, updateObj: Partial<ICareTaker>) => {
	try {
		const result = await careTakerRepo.findOneAndUpdate(new Types.ObjectId(userId), updateObj);
		if (!result) throw careTakerResponses.UPDATE_FAILED;
		return result;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw careTakerResponses.SERVER_ERR;
	}
};

const deleteOne = async (userId: string) => {
	try {
		const result = await careTakerRepo.findOneAndUpdate(new Types.ObjectId(userId), { isDeleted: true });
		if (!result) throw careTakerResponses.DELETE_FAILED;
		return careTakerResponses.DELETE_SUCCESSFUL;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw careTakerResponses.SERVER_ERR;
	}
};

export default {
	find,
	findOne,
	findOneById,
	insertOne,
	findOneAndUpdate,
	deleteOne,
};
