/**
 * Joins an array of strings with a specified separator, skipping empty, undefined, or null values.
 *
 * @param {Array<string | null | undefined>} strings - The array of strings to join.
 * @param {string} [separator=" "] - The separator to use between strings. Defaults to a single space.
 * @returns {string} The joined string, excluding any invalid values.
 *
 * @example
 * joinStrings(["hello", null, undefined, "world"], "/");
 * // Returns: "hello/world"
 *
 * @example
 * joinStrings([null, undefined, " ", "valid"], "-");
 * // Returns: "valid"
 *
 * @example
 * joinStrings([null, undefined]);
 * // Returns: ""
 */
export const joinStrings = (
  strings: (string | null | undefined)[],
  separator: string = ' '
): string =>
  strings
    .filter((str) => {
      const preparedStr = typeof str === 'number' ? String(str) : str;

      return typeof preparedStr === 'string' && preparedStr.trim() !== '';
    })
    .join(separator);
