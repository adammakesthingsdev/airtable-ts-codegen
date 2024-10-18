import { recase } from '@kristiandupont/recase';
import { remove } from 'diacritics';
var toPascalCase = recase(null, 'pascal');
/** Used for identifiers. If the name has symbols or is illegal Typescript, strip out symbols and make it PascalCase. */
// NB: A wider set of things than are accepted by this function are valid identifiers in TypeScript (see https://stackoverflow.com/a/9337047). However, this works well for our purposes.
export var escapeIdentifier = function (name) {
    var preprocessed = remove(name).trim();
    var isLegalIdentifier = true;
    if (!/^[$A-Z_a-z][\w$]*$/.test(preprocessed)) {
        isLegalIdentifier = false;
    }
    try {
        // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new
        new Function("const ".concat(preprocessed, " = 1;"));
    }
    catch (_a) {
        isLegalIdentifier = false;
    }
    if (isLegalIdentifier) {
        return preprocessed;
    }
    // Remove all characters up to the first valid identifier start character (A-Z, a-z, $), then
    // replace all invalid characters with underscores, and finally collapse multiple underscores into one.
    var validIdentifierStartIndex = preprocessed.search(/[$A-Za-z]/);
    if (validIdentifierStartIndex === -1) {
        throw new Error("Invalid and unsalvageable identifier: ".concat(name));
    }
    var snaked = preprocessed
        .slice(validIdentifierStartIndex)
        .replace(/[^$A-Z_a-z\d]/g, '_')
        .replace(/_+/g, '_');
    var result = toPascalCase(snaked);
    if (result.length === 0) {
        throw new Error("Invalid and unsalvageable identifier: ".concat(name));
    }
    return result;
};
