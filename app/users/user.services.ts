import { Types } from "mongoose";

import userRepo from "./user.repo";
import { sanitizeQueryObject } from "../utils/sanitize-queries";

import { IBaseUser } from "./user.types";
import { userResponses } from "./user.responses";

const find = async (query: Partial<IBaseUser>) => await userRepo.find(query);

const findOne = async (query: Partial<IBaseUser>) => {
	try {
		const result = await userRepo.findOne(query);
		if (!result) throw userResponses.NOT_FOUND;
		return result;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw userResponses.SERVER_ERR;
	}
};

const findOneById = async (userId: string) => {
	try {
		const result = await userRepo.findOneById(new Types.ObjectId(userId));
		if (!result) throw userResponses.NOT_FOUND;
		return result;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw userResponses.SERVER_ERR;
	}
};

const insertOne = async (data: IBaseUser) => {
	try {
		const result = await userRepo.insertOne(data);
		if (!result) throw userResponses.INSERT_FAILED;
		return result;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw userResponses.SERVER_ERR;
	}
};

const findOneAndUpdate = async (userId: string, updateObj: Partial<IBaseUser>) => {
	try {
		const result = await userRepo.findOneAndUpdate(new Types.ObjectId(userId), updateObj);
		if (!result) throw userResponses.UPDATE_FAILED;
		return result;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw userResponses.SERVER_ERR;
	}
};

const deleteOne = async (userId: string) => {
	try {
		const result = await userRepo.findOneAndUpdate(new Types.ObjectId(userId), { isDeleted: true });
		if (!result) throw userResponses.DELETE_FAILED;
		return userResponses.DELETE_SUCCESSFUL;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw userResponses.SERVER_ERR;
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
