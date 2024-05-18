import { reviewModel } from "./review.schema";

import { IReview } from "./review.types";

const find = async (query: Partial<IReview>) => await reviewModel.find(query);

const findOne = async (query: Partial<IReview>) => await reviewModel.findOne(query);

const insertOne = async (review: IReview) => await reviewModel.create(review);

const insertMany = async (reviews: IReview[]) => await reviewModel.insertMany(reviews);

const findOneAndUpdate = async (findQuery: Partial<IReview>, updateObj: Partial<IReview>) =>
	await reviewModel.findOneAndUpdate(findQuery, updateObj);

export default {
	find,
	findOne,
	insertOne,
	insertMany,
	findOneAndUpdate,
};
