import { Types } from "mongoose";

import userRepo from "./user.repo";
import { sanitizeQueryObject } from "../utils/sanitize-queries";

import { IUser } from "./user.types";
import { userResponses } from "./user.responses";

const find = async (query: Partial<IUser>) => await userRepo.find(query);

const findOne = async (query: Partial<IUser>) => {
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

const findOneByEmail = async (email: string) => {
	try {
		const result = await userRepo.findOneByEmail(email);
		if (!result) throw userResponses.NOT_FOUND;
		return result;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw userResponses.SERVER_ERR;
	}
};

const insertOne = async (data: Partial<IUser>) => {
	try {
		const result = await userRepo.insertOne(data);
		if (!result) throw userResponses.INSERT_FAILED;
		return result;
	} catch (error: any) {
		console.log(error);
		if (error.statusCode) throw error;
		throw userResponses.SERVER_ERR;
	}
};

const findOneAndUpdate = async (query: Partial<IUser>, updateObj: Partial<IUser>, safe: boolean = false) => {
	try {
		const result = await userRepo.findOneAndUpdate(query, updateObj);

		if (safe) return result;

		if (!result) throw userResponses.UPDATE_FAILED;
		return result;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw userResponses.SERVER_ERR;
	}
};

const deleteOne = async (userId: string) => {
	try {
		const result = await userRepo.findOneAndUpdate({ _id: new Types.ObjectId(userId) }, { isDeleted: true });
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
	findOneByEmail,
	insertOne,
	findOneAndUpdate,
	deleteOne,
};
