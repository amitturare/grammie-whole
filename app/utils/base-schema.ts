import z from "zod";
import { Schema, SchemaDefinitionProperty } from "mongoose";

export class BaseSchema extends Schema {
	constructor(schema: { [key: string]: SchemaDefinitionProperty<any, any> }) {
		super(
			{
				...schema,
				isDeleted: {
					type: Boolean,
					require: true,
					default: false,
				},
				// createdBy: {
				// 	type: Schema.Types.ObjectId,
				// 	ref: "users",
				// },
				// updatedBy: {
				// 	type: Schema.Types.ObjectId,
				// 	ref: "users",
				// },
			},
			{ timestamps: true }
		);
	}
}

export const ZBase = z.object({
	_id: z.string().optional(),
	isDeleted: z.boolean().optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});
