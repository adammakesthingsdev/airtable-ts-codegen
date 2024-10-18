import { FieldSchema } from './getBaseSchema';
/**
 * Returns the corresponding Typescript type for the given Airtable field type.
 *
 * Unsupported fields return `null` and will be filtered out by the caller.
 */
export declare const jsTypeForAirtableType: (field: FieldSchema) => string | null;
