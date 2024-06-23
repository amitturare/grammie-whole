import { Types } from "mongoose";

import eventRepo from "./event.repo";
import { sanitizeQueryObject } from "../utils/sanitize-queries";

import { IEvent } from "./event.types";
import { eventResponses } from "./event.responses";

const find = async (query: Partial<IEvent>) => await eventRepo.find(query);

const findOne = async (query: Partial<IEvent>) => {
	try {
		const result = await eventRepo.findOne(query);
		if (!result) throw eventResponses.NOT_FOUND;
		return result;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw eventResponses.SERVER_ERR;
	}
};

const findOneById = async (eventId: string) => {
	try {
		const result = await eventRepo.findOneById(new Types.ObjectId(eventId));
		if (!result) throw eventResponses.NOT_FOUND;
		return result;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw eventResponses.SERVER_ERR;
	}
};

const findOneByUserId = async (userId: string) => {
	try {
		const result = await eventRepo.findOneByUserId(new Types.ObjectId(userId));
		if (!result) throw eventResponses.NOT_FOUND;
		return result;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw eventResponses.SERVER_ERR;
	}
};

const insertOne = async (currUserId: string, data: Partial<IEvent>) => {
	try {
		data.participants = [new Types.ObjectId(currUserId)];
		const result = await eventRepo.insertOne({ createdBy: currUserId, ...data });
		if (!result) throw eventResponses.INSERT_FAILED;
		return result;
	} catch (error: any) {
		console.log(error);
		if (error.statusCode) throw error;
		throw eventResponses.SERVER_ERR;
	}
};

const insertParticipant = async (eventId: string, userId: string) => {
	try {
		const event = await findOneById(eventId);
		if (event.participants.includes(new Types.ObjectId(userId))) throw eventResponses.ALREADY_REGISTERED;

		// Caretaker cannot participate
		const result = eventRepo.insertParticipant(new Types.ObjectId(eventId), new Types.ObjectId(userId));
		if (!result) throw eventResponses.REGISTERED_FAILED;
		return eventResponses.REGISTERED_SUCCESSFULLY;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw eventResponses.SERVER_ERR;
	}
};

const findOneAndUpdate = async (eventId: string, updateObj: Partial<IEvent>) => {
	try {
		const event = await findOneById(eventId);
		const lastDateToEnrol = new Date(event.lastDateToEnrol);
		const currentDate = new Date(Date.now());
		if (lastDateToEnrol < currentDate) {
			throw eventResponses.CANNOT_UPDATE;
		}

		const result = await eventRepo.findOneAndUpdate({ _id: new Types.ObjectId(eventId) }, updateObj);
		if (!result) throw eventResponses.UPDATE_FAILED;
		return eventResponses.UPDATE_SUCCESSFUL;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw eventResponses.SERVER_ERR;
	}
};

const deleteOne = async (eventId: string) => {
	try {
		const result = await eventRepo.findOneAndUpdate({ _id: new Types.ObjectId(eventId) }, { isDeleted: true });
		if (!result) throw eventResponses.DELETE_FAILED;
		return eventResponses.DELETE_SUCCESSFUL;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw eventResponses.SERVER_ERR;
	}
};

export default {
	find,
	findOne,
	findOneById,
	findOneByUserId,
	insertOne,
	insertParticipant,
	findOneAndUpdate,
	deleteOne,
};
