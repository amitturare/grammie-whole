import userRepo from "./user.repo";

import { IUser, UserDocument } from "./user.types";
import { userResponses } from "./user.responses";

const find = async (query: Partial<IUser>) => await userRepo.find(query);

async function findOne(query: Partial<IUser>, safe?: false): Promise<UserDocument>;
async function findOne(query: Partial<IUser>, safe?: true): Promise<UserDocument | false>;
async function findOne(query: Partial<IUser>, safe: boolean = false) {
	const result = await userRepo.findOne(query);

	if (!result) {
		if (safe) return false;
		throw userResponses.USER_NOT_FOUND;
	}

	return result as UserDocument;
}

const insertOne = async (menuItem: IUser) => {
	try {
		const insertedMenuItem = await userRepo.insertOne(menuItem);
		return insertedMenuItem;
	} catch (error: any) {
		if (error.statusCode) throw userResponses.INSERT_FAILED;
		throw userResponses.SERVER_ERR;
	}
};

const insertMany = async (menuItems: IUser[]) => {
	try {
		const insertedMenuItems = await userRepo.insertMany(menuItems);
		return insertedMenuItems;
	} catch (error: any) {
		if (error.statusCode) throw userResponses.INSERT_FAILED;
		throw userResponses.SERVER_ERR;
	}
};

const findOneAndUpdate = async (findQuery: Partial<IUser>, updateObj: Partial<IUser>) => {
	try {
		const result = await userRepo.findOneAndUpdate(findQuery, updateObj);
		return userResponses.UPDATE_SUCCESSFUL;
	} catch (error: any) {
		if (error.statusCode) throw userResponses.UPDATE_FAILED;
		throw userResponses.SERVER_ERR;
	}
};

const deleteOne = async (query: Partial<IUser>) => {
	try {
		const result = await userRepo.findOneAndUpdate(query, { isDeleted: true });
		return userResponses.DELETE_SUCCESSFUL;
	} catch (error: any) {
		if (error.statusCode) throw userResponses.DELETE_FAILED;
		throw userResponses.SERVER_ERR;
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
