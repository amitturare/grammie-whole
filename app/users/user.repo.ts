import { Types } from "mongoose";

import { userModel } from "./user.schema";

import { IUser } from "./user.types";

const find = async (query: Partial<IUser>) => await userModel.find({ ...query, isDeleted: false });

const findOne = async (query: Partial<IUser>) => await userModel.findOne({ ...query, isDeleted: false });

const findOneById = async (userId: Types.ObjectId) => await userModel.findOne({ _id: userId, isDeleted: false });

const findOneByEmail = async (email: string) => await userModel.findOne({ email: email, isDeleted: false });

const insertOne = async (user: Partial<IUser>) => await userModel.create(user);

const findOneAndUpdate = async (query: Partial<IUser>, updateObj: Partial<IUser>) =>
	await userModel.findOneAndUpdate(query, updateObj, { strict: false });

export default {
	find,
	findOne,
	findOneById,
	findOneByEmail,
	insertOne,
	findOneAndUpdate,
};
