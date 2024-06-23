import { Types } from "mongoose";

import { eventModel } from "./event.schema";

import { IEvent } from "./event.types";

const find = async (query: Partial<IEvent>) => await eventModel.find({ ...query, isDeleted: false });

const findOne = async (query: Partial<IEvent>) => await eventModel.findOne({ ...query, isDeleted: false });

const findOneById = async (eventId: Types.ObjectId) => await eventModel.findOne({ _id: eventId, isDeleted: false });

const findOneByUserId = async (userId: Types.ObjectId) =>
	await eventModel.findOne({ createdBy: userId, isDeleted: false });

const insertOne = async (event: Partial<IEvent>) => await eventModel.create(event);

const insertParticipant = async (eventId: Types.ObjectId, userId: Types.ObjectId) =>
	await eventModel.findOneAndUpdate(
		{ _id: eventId },
		{
			$push: { participants: userId },
		}
	);

const findOneAndUpdate = async (query: Partial<IEvent>, updateObj: Partial<IEvent>) =>
	await eventModel.findOneAndUpdate(query, updateObj);

export default {
	find,
	findOne,
	findOneById,
	findOneByUserId,
	insertOne,
	insertParticipant,
	findOneAndUpdate,
};
