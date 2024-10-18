import { Config } from '.';
export type FieldSchema = {
    id: string;
    type: string;
    name: string;
    description?: string;
    options?: object;
};
export type BaseSchema = {
    id: string;
    name: string;
    description?: string;
    fields: FieldSchema[];
}[];
/**
 * Get the schemas from the cache or Airtable API for the tables in the given base.
 * @see https://airtable.com/developers/web/api/get-base-schema
 * @param baseId The base id to get the schemas for
 */
export declare const getBaseSchema: (baseId: string, options: Config) => Promise<BaseSchema>;
