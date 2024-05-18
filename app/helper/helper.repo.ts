import { helperModel } from "./helper.schema";

import { IHelper } from "./helper.types";

const find = async (query: Partial<IHelper>) => await helperModel.find(query);

const findOne = async (query: Partial<IHelper>) => await helperModel.findOne(query);

const insertOne = async (menuItem: IHelper) => await helperModel.create(menuItem);

const insertMany = async (menuItems: IHelper[]) => await helperModel.insertMany(menuItems);

const findOneAndUpdate = async (findQuery: Partial<IHelper>, updateObj: Partial<IHelper>) =>
	await helperModel.findOneAndUpdate(findQuery, updateObj);

export default {
	find,
	findOne,
	insertOne,
	insertMany,
	findOneAndUpdate,
};
