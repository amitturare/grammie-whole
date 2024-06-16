import z from "zod";
import {
	DefaultSchemaOptions,
	FlatRecord,
	ResolveSchemaOptions,
	Schema,
	SchemaDefinitionProperty,
	SchemaOptions,
	Types,
} from "mongoose";

export class BaseSchema extends Schema {
	constructor(
		schema: { [key: string]: SchemaDefinitionProperty<any, any> },
		options?: ResolveSchemaOptions<DefaultSchemaOptions> | SchemaOptions<FlatRecord<{ [x: string]: unknown }>>
	) {
		super(
			{
				...schema,
				isDeleted: {
					type: Boolean,
					require: true,
					default: false,
				},
			},
			{ timestamps: true, ...options }
		);
	}
}

export const ZBase = z.object({
	_id: z.instanceof(Types.ObjectId).optional(),
	isDeleted: z.boolean().optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

export interface IResponses {
	[key: string]: {
		statusCode: number;
		message: string;
	};
}

export interface IPaginationSearchQueries {
	page?: number;
	limit?: number;
	searchQuery?: any;
	filters?: { [key: string]: any };
}
