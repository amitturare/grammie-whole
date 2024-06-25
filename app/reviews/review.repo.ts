import { Types } from "mongoose";

import { reviewModel } from "./review.schema";

import { IReview } from "./review.types";

const find = async (query: Partial<IReview>) => await reviewModel.find({ ...query, isDeleted: false });

const findOne = async (query: Partial<IReview>) => await reviewModel.findOne({ ...query, isDeleted: false });

const findOneById = async (reviewId: Types.ObjectId) =>
	await reviewModel.findOne({ _id: reviewId, isDeleted: false });

const findOneByUserId = async (userId: Types.ObjectId) => await reviewModel.findOne({ userId, isDeleted: false });

const findOneByCareTakerId = async (caretakerId: Types.ObjectId) =>
	await reviewModel.findOne({ caretakerId, isDeleted: false });

const insertOne = async (review: Partial<IReview>) => await reviewModel.create(review);

const findOneAndUpdate = async (query: Partial<IReview>, updateObj: Partial<IReview>) =>
	await reviewModel.findOneAndUpdate(query, updateObj);

export default {
	find,
	findOne,
	findOneById,
	findOneByUserId,
	findOneByCareTakerId,
	insertOne,
	findOneAndUpdate,
};
