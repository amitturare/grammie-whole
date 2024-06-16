import { Types } from "mongoose";

import { careTakerModel } from "./careTaker.schema";

import { ICareTaker } from "./careTaker.types";

const find = async (query: Partial<ICareTaker>) => await careTakerModel.find({ ...query, isDeleted: false });

const findOne = async (query: Partial<ICareTaker>) => await careTakerModel.findOne({ ...query, isDeleted: false });

const findOneById = async (careTakerId: Types.ObjectId) => await careTakerModel.findOne({ _id: careTakerId, isDeleted: false });

const insertOne = async (careTaker: ICareTaker) => await careTakerModel.create(careTaker);

const findOneAndUpdate = async (careTakerId: Types.ObjectId, updateObj: Partial<ICareTaker>) =>
	await careTakerModel.findOneAndUpdate({ _id: careTakerId }, updateObj);

export default {
	find,
	findOne,
	findOneById,
	insertOne,
	findOneAndUpdate,
};
