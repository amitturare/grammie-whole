import { Types } from "mongoose";

import { baseUserModel } from "./user.schema";

import { IBaseUser } from "./user.types";

const find = async (query: Partial<IBaseUser>) => await baseUserModel.find({ ...query, isDeleted: false });

const findOne = async (query: Partial<IBaseUser>) => await baseUserModel.findOne({ ...query, isDeleted: false });

const findOneById = async (userId: Types.ObjectId) => await baseUserModel.findOne({ _id: userId, isDeleted: false });

const insertOne = async (user: IBaseUser) => await baseUserModel.create(user);

const findOneAndUpdate = async (userId: Types.ObjectId, updateObj: Partial<IBaseUser>) =>
	await baseUserModel.findOneAndUpdate({ _id: userId }, updateObj);

export default {
	find,
	findOne,
	findOneById,
	insertOne,
	findOneAndUpdate,
};
