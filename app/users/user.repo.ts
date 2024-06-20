import { Types } from "mongoose";

import { baseUserModel } from "./user.schema";

import { IBaseUser } from "./user.types";

const find = async (query: Partial<IBaseUser>) => await baseUserModel.find({ ...query, isDeleted: false });

const findOne = async (query: Partial<IBaseUser>) => await baseUserModel.findOne({ ...query, isDeleted: false });

const findOneById = async (userId: Types.ObjectId) => await baseUserModel.findOne({ _id: userId, isDeleted: false });

const findOneByEmail = async (email: string) => await baseUserModel.findOne({ email: email, isDeleted: false });

const insertOne = async (user: Partial<IBaseUser>) => await baseUserModel.create(user);

const findOneAndUpdate = async (query: Partial<IBaseUser>, updateObj: Partial<IBaseUser>) =>
	await baseUserModel.findOneAndUpdate(query, updateObj);

export default {
	find,
	findOne,
	findOneById,
	findOneByEmail,
	insertOne,
	findOneAndUpdate,
};
