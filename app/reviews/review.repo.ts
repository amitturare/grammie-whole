import { Types } from "mongoose";

import { reviewModel } from "./review.schema";

import { IReview } from "./review.types";

const find = async (query: Partial<IReview>) => await reviewModel.find({ ...query, isDeleted: false });

const findOne = async (query: Partial<IReview>) => await reviewModel.findOne({ ...query, isDeleted: false });

const findOneById = async (reviewId: Types.ObjectId) => await reviewModel.findOne({ _id: reviewId, isDeleted: false });

const findOneByUserId = async (userId: Types.ObjectId) => await reviewModel.findOne({ userId, isDeleted: false });

const findOneByCareTakerId = async (caretakerId: Types.ObjectId) =>
	await reviewModel.findOne({ caretakerId, isDeleted: false });

const findAvgRatingForCareTaker = async (caretakerId: Types.ObjectId) => {
	const result = await reviewModel.aggregate([
		{ $match: { caretakerId: new Types.ObjectId(caretakerId) } },
		{
			$group: {
				_id: "$caretakerId",
				averageRating: { $avg: "$rating" },
			},
		},
	]);

	if (result.length > 0) {
		return result[0].averageRating;
	} else {
		return 0;
	}
};

const insertOne = async (review: Partial<IReview>) => await reviewModel.create(review);

const findOneAndUpdate = async (query: Partial<IReview>, updateObj: Partial<IReview>) =>
	await reviewModel.findOneAndUpdate(query, updateObj);

export default {
	find,
	findOne,
	findOneById,
	findOneByUserId,
	findOneByCareTakerId,
	findAvgRatingForCareTaker,
	insertOne,
	findOneAndUpdate,
};
