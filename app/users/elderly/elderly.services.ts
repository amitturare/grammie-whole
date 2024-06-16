import { Types } from "mongoose";

import elderlyRepo from "./elderly.repo";
import { sanitizeQueryObject } from "../../utils/sanitize-queries";

import { IElderly } from "./elderly.types";
import { elderlyResponses } from "./elderly.responses";

const find = async (query: Partial<IElderly>) => await elderlyRepo.find(query);

const findOne = async (query: Partial<IElderly>) => {
	try {
		const result = await elderlyRepo.findOne(query);
		if (!result) throw elderlyResponses.NOT_FOUND;
		return result;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw elderlyResponses.SERVER_ERR;
	}
};

const findOneById = async (userId: string) => {
	try {
		const result = await elderlyRepo.findOneById(new Types.ObjectId(userId));
		if (!result) throw elderlyResponses.NOT_FOUND;
		return result;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw elderlyResponses.SERVER_ERR;
	}
};

const insertOne = async (data: IElderly) => {
	try {
		const result = await elderlyRepo.insertOne(data);
		if (!result) throw elderlyResponses.INSERT_FAILED;
		return result;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw elderlyResponses.SERVER_ERR;
	}
};

const findOneAndUpdate = async (userId: string, updateObj: Partial<IElderly>) => {
	try {
		const result = await elderlyRepo.findOneAndUpdate(new Types.ObjectId(userId), updateObj);
		if (!result) throw elderlyResponses.UPDATE_FAILED;
		return result;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw elderlyResponses.SERVER_ERR;
	}
};

const deleteOne = async (userId: string) => {
	try {
		const result = await elderlyRepo.findOneAndUpdate(new Types.ObjectId(userId), { isDeleted: true });
		if (!result) throw elderlyResponses.DELETE_FAILED;
		return elderlyResponses.DELETE_SUCCESSFUL;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw elderlyResponses.SERVER_ERR;
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
