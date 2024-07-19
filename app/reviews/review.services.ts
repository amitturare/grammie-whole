import { Types } from "mongoose";

import reviewRepo from "./review.repo";
import { sanitizeQueryObject } from "../utils/sanitize-queries";

import { IReview, IReviewCreation } from "./review.types";
import { reviewResponses } from "./review.responses";

const find = async (query: Partial<IReview>) => await reviewRepo.find(query);

const findOne = async (query: Partial<IReview>, safe: boolean = false) => {
	try {
		const result = await reviewRepo.findOne(query);

		if (safe) return result;

		if (!result) throw reviewResponses.NOT_FOUND;
		return result;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw reviewResponses.SERVER_ERR;
	}
};

const findOneById = async (reviewId: string) => {
	try {
		const result = await reviewRepo.findOneById(new Types.ObjectId(reviewId));
		if (!result) throw reviewResponses.NOT_FOUND;
		return result;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw reviewResponses.SERVER_ERR;
	}
};

const findOneByUserId = async (userId: string) => {
	try {
		const result = await reviewRepo.findOneByUserId(new Types.ObjectId(userId));
		if (!result) throw reviewResponses.NOT_FOUND;
		return result;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw reviewResponses.SERVER_ERR;
	}
};

const findOneByCareTakerId = async (caretakerId: string) => {
	try {
		const result = await reviewRepo.findOneByCareTakerId(new Types.ObjectId(caretakerId));
		if (!result) throw reviewResponses.NOT_FOUND;
		return result;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw reviewResponses.SERVER_ERR;
	}
};

const findAvgRatingForCareTaker = async (caretakerId: string) => {
	try {
		const result = await reviewRepo.findAvgRatingForCareTaker(new Types.ObjectId(caretakerId));
		return result;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw reviewResponses.SERVER_ERR;
	}
};

const insertOne = async (currUserId: string, caretakerId: string, data: IReviewCreation) => {
	try {
		const review = await findOne(
			{
				userId: new Types.ObjectId(currUserId),
				caretakerId: new Types.ObjectId(caretakerId),
			},
			true
		);
		if (review) throw reviewResponses.ALREADY_EXISTS;

		const result = await reviewRepo.insertOne({
			...data,
			userId: new Types.ObjectId(currUserId),
			caretakerId: new Types.ObjectId(caretakerId),
		});
		if (!result) throw reviewResponses.INSERT_FAILED;
		return result;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw reviewResponses.SERVER_ERR;
	}
};

const findOneAndUpdate = async (reviewId: string, updateObj: Partial<IReview>) => {
	try {
		const result = await reviewRepo.findOneAndUpdate({ _id: new Types.ObjectId(reviewId) }, updateObj);
		if (!result) throw reviewResponses.UPDATE_FAILED;
		return reviewResponses.UPDATE_SUCCESSFUL;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw reviewResponses.SERVER_ERR;
	}
};

const deleteOne = async (reviewId: string) => {
	try {
		const result = await reviewRepo.findOneAndUpdate({ _id: new Types.ObjectId(reviewId) }, { isDeleted: true });
		if (!result) throw reviewResponses.DELETE_FAILED;
		return reviewResponses.DELETE_SUCCESSFUL;
	} catch (error: any) {
		if (error.statusCode) throw error;
		throw reviewResponses.SERVER_ERR;
	}
};

export default {
	find,
	findOne,
	findOneById,
	findOneByUserId,
	findOneByCareTakerId,
	findAvgRatingForCareTaker,
	insertOne,
	findOneAndUpdate,
	deleteOne,
};
