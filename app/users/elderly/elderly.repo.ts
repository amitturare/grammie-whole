import { Types } from "mongoose";

import { elderlyUserModel } from "./elderly.schema";

import { IElderly } from "./elderly.types";

const find = async (query: Partial<IElderly>) => await elderlyUserModel.find({ ...query, isDeleted: false });

const findOne = async (query: Partial<IElderly>) => await elderlyUserModel.findOne({ ...query, isDeleted: false });

const findOneById = async (elderlyId: Types.ObjectId) =>
	await elderlyUserModel.findOne({ _id: elderlyId, isDeleted: false });

const insertOne = async (elderly: IElderly) => await elderlyUserModel.create(elderly);

const findOneAndUpdate = async (elderlyId: Types.ObjectId, updateObj: Partial<IElderly>) =>
	await elderlyUserModel.findOneAndUpdate({ _id: elderlyId }, updateObj);

export default {
	find,
	findOne,
	findOneById,
	insertOne,
	findOneAndUpdate,
};
