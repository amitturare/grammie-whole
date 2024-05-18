import reviewRepo from "./review.repo";

import { IReview } from "./review.types";
import { reviewResponses } from "./review.responses";

const find = async (query: Partial<IReview>) => await reviewRepo.find(query);

const findOne = async (query: Partial<IReview>) => {
	try {
		const result = await reviewRepo.findOne(query);
		return result;
	} catch (error: any) {
		if (error.statusCode) throw reviewResponses.NOT_FOUND;
		throw reviewResponses.SERVER_ERR;
	}
};

const insertOne = async (data: IReview) => {
	try {
		const result = await reviewRepo.insertOne(data);
		return result;
	} catch (error: any) {
		if (error.statusCode) throw reviewResponses.INSERT_FAILED;
		throw reviewResponses.SERVER_ERR;
	}
};

const insertMany = async (data: IReview[]) => {
	try {
		const result = await reviewRepo.insertMany(data);
		return result;
	} catch (error: any) {
		if (error.statusCode) throw reviewResponses.INSERT_FAILED;
		throw reviewResponses.SERVER_ERR;
	}
};

const findOneAndUpdate = async (findQuery: Partial<IReview>, updateObj: Partial<IReview>) => {
	try {
		const result = await reviewRepo.findOneAndUpdate(findQuery, updateObj);
		return reviewResponses.UPDATE_SUCCESSFUL;
	} catch (error: any) {
		if (error.statusCode) throw reviewResponses.UPDATE_FAILED;
		throw reviewResponses.SERVER_ERR;
	}
};

const deleteOne = async (query: Partial<IReview>) => {
	try {
		const result = await reviewRepo.findOneAndUpdate(query, { isDeleted: true });
		return reviewResponses.DELETE_SUCCESSFUL;
	} catch (error: any) {
		if (error.statusCode) throw reviewResponses.DELETE_FAILED;
		throw reviewResponses.SERVER_ERR;
	}
};

export default {
	find,
	findOne,
	insertOne,
	insertMany,
	findOneAndUpdate,
	deleteOne,
};
