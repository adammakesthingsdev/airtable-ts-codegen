/**
 * Returns the corresponding Typescript type for the given Airtable field type.
 *
 * Unsupported fields return `null` and will be filtered out by the caller.
 */
export var jsTypeForAirtableType = function (field) {
    switch (field.type) {
        case 'url':
        case 'email':
        case 'phoneNumber':
        case 'singleLineText':
        case 'multilineText':
        case 'richText':
        case 'singleSelect':
        case 'externalSyncSource':
            return 'string';
        case 'multipleRecordLinks':
        case 'multipleSelects':
            return 'string[]';
        case 'number':
        case 'rating':
        case 'duration':
        case 'currency':
        case 'percent':
        case 'count':
        case 'autoNumber':
            return 'number | null';
        case 'date':
        case 'dateTime':
        case 'createdTime':
        case 'lastModifiedTime':
            return 'number | null'; // Unix timestamp in seconds
        case 'checkbox':
            return 'boolean';
        case 'lookup':
        case 'multipleLookupValues':
        case 'rollup':
        case 'formula':
            if (field.options
                && 'result' in field.options
                && typeof field.options.result === 'object'
                && field.options.result != null) {
                var innerType = jsTypeForAirtableType(field.options.result);
                if (innerType == null)
                    return null;
                return "".concat(innerType, " | null");
            }
            throw new Error("Invalid ".concat(field.type, " field (no options.result): ").concat(field.id));
        // Special cases we don't yet support; for now, skip these fields
        // case 'aiText':
        //   return 'AiTextObject';
        // case 'singleCollaborator':
        // case 'createdBy':
        // case 'lastModifiedBy':
        //   return 'CollaboratorObject';
        // case 'multipleCollaborators':
        //   return 'CollaboratorObject[]';
        // case 'multipleAttachments':
        //   return 'AttachmentObject[]';
        // case 'barcode':
        //   return 'BarcodeObject';
        // case 'button':
        //   return 'ButtonObject';
        case 'aiText':
        case 'singleCollaborator':
        case 'createdBy':
        case 'lastModifiedBy':
        case 'multipleCollaborators':
        case 'multipleAttachments':
        case 'barcode':
        case 'button':
            return null;
        default:
            throw new Error("Could not convert Airtable type '".concat(field.type, "' to a TypeScript type for field ").concat(field.id));
    }
};