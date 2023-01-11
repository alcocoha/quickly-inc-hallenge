/**
 * Validate that there is only text and no numbers
 * @param value <String>
 * @returns boolean
 */
export const validationText = (value) => /^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(value);

/**
 * Validate that there is a valid email
 * @param value <String>
 * @returns boolean
 */
export const validationEmail = (value) =>
  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value);
