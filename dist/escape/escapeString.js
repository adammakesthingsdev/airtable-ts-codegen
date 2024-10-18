/** Used for single-quoted strings. */
export var escapeString = function (str) { return str.replace(/'/g, "\\'").replace(/\n/g, '\\n'); };
