import * as z from 'zod';

export type ModelSchema = z.ZodObject;
export type InferModel<T extends ModelSchema> = z.Infer<T>;

export const modelSchema = z.object;
export const dataType = { ...z };
