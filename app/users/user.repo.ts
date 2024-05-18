import { userModel } from "./user.schema";

import { IUser } from "./user.types";

const find = async (query: Partial<IUser>) => await userModel.find(query);

const findOne = async (query: Partial<IUser>) => await userModel.findOne(query);

const insertOne = async (user: IUser) => await userModel.create(user);

const insertMany = async (users: IUser[]) => await userModel.insertMany(users);

const findOneAndUpdate = async (findQuery: Partial<IUser>, updateObj: Partial<IUser>) =>
	await userModel.findOneAndUpdate(findQuery, updateObj);

export default {
	find,
	findOne,
	insertOne,
	insertMany,
	findOneAndUpdate,
};
