import helperRepo from "./helper.repo";

import { IHelper } from "./helper.types";
import { helperResponses } from "./helper.responses";

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

const insertOne = async (menuItem: IHelper) => {
	try {
		const insertedMenuItem = await helperRepo.insertOne(menuItem);
		return insertedMenuItem;
	} catch (error: any) {
		if (error.statusCode) throw helperResponses.INSERT_FAILED;
		throw helperResponses.SERVER_ERR;
	}
};

const insertMany = async (menuItems: IHelper[]) => {
	try {
		const insertedMenuItems = await helperRepo.insertMany(menuItems);
		return insertedMenuItems;
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

export default {
	find,
	findOne,
	insertOne,
	insertMany,
	findOneAndUpdate,
	deleteOne,
};
