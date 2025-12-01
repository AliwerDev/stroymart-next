/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column } from '@/components/ui/Table';
import { IFileResponse } from '@/types/file';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ClassNameValue, twMerge } from 'tailwind-merge';

dayjs.extend(customParseFormat);

/**
 * Combines multiple CSS class names into a single string, filtering out falsy values.
 * @param {...ClassValue} classes - CSS class names to combine
 * @returns {string} Combined CSS class string with falsy values removed
 * @example
 * cn('btn', 'btn-primary', undefined, false, 'active')
 * // Returns: 'btn btn-primary active'
 */
export const cn = (...classes: ClassNameValue[]) => {
  return twMerge(...classes.filter(Boolean));
};

/**
 * Type guard to check if a value is a plain object (not null, not an array).
 * @param {unknown} value - The value to check
 * @returns {value is Record<string, unknown>} True if the value is a plain object
 * @example
 * isObject({}) // true
 * isObject({ key: 'value' }) // true
 * isObject([]) // false
 * isObject(null) // false
 * isObject('string') // false
 */
export const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

/**
 * Validates if a string is valid JSON and represents an object.
 * @param {string} str - The string to validate as JSON
 * @returns {boolean} True if the string is valid JSON and represents an object
 * @example
 * isValidJson('{"key": "value"}') // true
 * isValidJson('["array"]') // false (not an object)
 * isValidJson('invalid json') // false
 */
export const isValidJson = (str: string) => {
  try {
    const parsed = JSON.parse(str);
    return isObject(parsed);
  } catch {
    return false;
  }
};

/**
 * Removes all non-alphanumeric characters and spaces from a string.
 * @param {string} str - The string to clean (defaults to empty string)
 * @returns {string} String with only alphanumeric characters
 * @example
 * removeSpaces('Hello World!') // 'HelloWorld'
 * removeSpaces('Test@#$%^&*()') // 'Test'
 */
export function removeSpaces(str: string = '') {
  return str.replace(/[^a-zA-Z0-9]/g, '').replace(/\s/g, '');
}

export function removeWhitespaces(str: string = '') {
  return str.replace(/\s/g, '');
}

/**
 * Creates a full date-time string by combining today's date with a given time.
 * @param {string} time - Time string in format 'HH:mm' or 'HH:mm:ss'
 * @returns {string} Full date-time string in format 'YYYY-MM-DD HH:mm' or 'YYYY-MM-DD HH:mm:ss'
 * @example
 * getDateStringByTime('14:30') // '2024-01-15 14:30' (if today is 2024-01-15)
 * getDateStringByTime('09:15:30') // '2024-01-15 09:15:30'
 */
export function getDateStringByTime(time: string) {
  const today = dayjs().format('YYYY-MM-DD');
  return `${today} ${time}`;
}

/**
 * Formats a number by adding spaces as thousand separators.
 * @param {number | string} value - The number to format
 * @returns {string} Formatted number with spaces as thousand separators, or empty string if invalid
 * @example
 * formatNumberWithSpaces(1234567) // '1 234 567'
 * formatNumberWithSpaces(1234.56) // '1 234.56'
 * formatNumberWithSpaces('1000000') // '1 000 000'
 * formatNumberWithSpaces('') // ''
 */
export function formatNumberWithSpaces(value: number | string): string {
  if (value === null || value === undefined || value === '') return '';
  const num = typeof value === 'number' ? value : Number(value);
  if (isNaN(num)) return '';

  const [integerPart, decimalPart] = num.toString().split('.');
  const formattedInt = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return decimalPart ? `${formattedInt}.${decimalPart}` : formattedInt;
}

/**
 * Checks if a value can be converted to a valid number.
 * @param {unknown} value - The value to check
 * @returns {boolean} True if the value can be converted to a valid number
 * @example
 * isNumber(123) // true
 * isNumber('123') // true
 * isNumber('abc') // false
 * isNumber('') // false
 * isNumber(null) // false
 */
export function isNumber(value: unknown): boolean {
  return !isNaN(Number(value));
}

/**
 * Checks if a value is considered empty (null, undefined, empty string, empty array, or empty object).
 * @param {unknown} value - The value to check
 * @returns {boolean} True if the value is considered empty
 * @example
 * isEmpty(null) // true
 * isEmpty(undefined) // true
 * isEmpty('') // true
 * isEmpty([]) // true
 * isEmpty({}) // true
 * isEmpty('hello') // false
 * isEmpty([1, 2, 3]) // false
 * isEmpty({ key: 'value' }) // false
 */
export function isEmpty(value: unknown): boolean {
  return (
    value === null ||
    value === undefined ||
    value === '' ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0)
  );
}

/**
 * Finds the label for a given value in an array of options.
 * @param {Array<{value: string | number, label: string}>} options - The array of options
 * @param {string | number} value - The value to search for
 * @returns {string | undefined} The label corresponding to the value, or undefined if not found
 * @example
 * getLabelByValue('active', [{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]) // 'Active'
 * getLabelByValue('inactive', [{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]) // 'Inactive'
 * getLabelByValue('unknown', [{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]) // undefined
 */
export const getLabelByValue = (
  options: { value: string | number; label: string }[],
  value: string | number
) => {
  return options.find((option) => option.value === value)?.label;
};

/**
 * Removes the language prefix from a pathname if present.
 * If the pathname starts with a language code (`uz`, `ru`, or `uzk`), it removes that prefix.
 * Otherwise, it returns the pathname unchanged.
 *
 * @param {string} pathname - The pathname to process.
 * @returns {string} - The pathname without the language prefix.
 *
 * @example
 * removeLanguagePrefix('/uz/broker/profile'); // Returns '/broker/profile'
 * removeLanguagePrefix('/ru/other/path'); // Returns '/other/path'
 * removeLanguagePrefix('/broker/profile'); // Returns '/broker/profile' (no change)
 */
export const removeLanguagePrefix = (pathname: string): string => {
  const languages = ['uz', 'ru', 'uzk', 'en'];
  const pathSegments = pathname.split('/').filter(Boolean);
  if (languages.includes(pathSegments[0])) {
    return `/${pathSegments.slice(1).join('/')}`;
  }
  return pathname;
};

export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const numberColumn = (page: number = 1, limit: number = 10): Column<unknown> => ({
  header: '№',
  key: 'key',
  width: 50,
  align: 'center',
  cell: (_, __, i) => {
    return (page - 1) * limit + i + 1;
  },
});

export const formatPhoneNumber = (phone: string = ''): string => {
  if (!phone) return '';
  // Faqat raqamlarni ajratib olamiz
  const digits = phone.replace(/\D/g, '');

  // UZ raqam 12 ta bo‘lishi kerak (+998 bilan)
  if (digits.length !== 12 || !digits.startsWith('998')) {
    return '';
  }

  // Format: +998 99 888 88 88
  const country = '+998';
  const code = digits.slice(3, 5);
  const part1 = digits.slice(5, 8);
  const part2 = digits.slice(8, 10);
  const part3 = digits.slice(10, 12);
  return `${country} (${code}) ${part1} ${part2} ${part3}`;
};

export const isValidDate = (date: string) => {
  // Check if the input is a string
  if (typeof date !== 'string') {
    return false;
  }

  // Check if the format matches DD.MM.YYYY pattern
  const dateRegex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
  const match = date.match(dateRegex);

  if (!match) {
    return false;
  }

  const [, day, month, year] = match;

  // Convert to numbers
  const dayNum = parseInt(day, 10);
  const monthNum = parseInt(month, 10);
  const yearNum = parseInt(year, 10);

  // Basic range checks
  if (monthNum < 1 || monthNum > 12) {
    return false;
  }

  if (dayNum < 1 || dayNum > 31) {
    return false;
  }

  // Check days in month
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Check for leap year
  const isLeapYear = (yearNum % 4 === 0 && yearNum % 100 !== 0) || yearNum % 400 === 0;

  // Adjust February days for leap year
  if (isLeapYear) {
    daysInMonth[1] = 29;
  }

  // Check if day is valid for the given month
  if (dayNum > daysInMonth[monthNum - 1]) {
    return false;
  }

  return true;
};

export const isValidTime = (time: string) => {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

// Password strength function
type PasswordRule = {
  name: string;
  regex: RegExp;
  message: string;
};

interface PasswordStrengthOptions {
  minLength?: number;
  rules?: PasswordRule[];
}

interface PasswordStrengthResult {
  strength: number;
  passedRules: string[];
  failedRules: string[];
  totalRules: number;
}

export const getPasswordStrength = (
  password: string = '',
  options?: PasswordStrengthOptions
): PasswordStrengthResult => {
  const defaultRules: PasswordRule[] = [
    {
      name: 'minLength',
      regex: /.{6,}/,
      message: 'Kamida 6 ta belgidan iborat bo‘lishi kerak',
    },
    {
      name: 'uppercase',
      regex: /[A-Z]/,
      message: 'Katta harf bo‘lishi kerak',
    },
    {
      name: 'number',
      regex: /[0-9]/,
      message: 'Raqam bo‘lishi kerak',
    },
    {
      name: 'specialChar',
      regex: /[!@#$%^_&*]/,
      message: 'Maxsus belgi bo‘lishi kerak',
    },
  ];

  const rules = options?.rules ?? defaultRules;

  const passedRules = rules.filter((rule) => rule.regex.test(password)).map((rule) => rule.name);
  const failedRules = rules.filter((rule) => !rule.regex.test(password)).map((rule) => rule.name);

  return {
    strength: passedRules.length,
    passedRules,
    failedRules,
    totalRules: rules.length,
  };
};

export function formatName(name: string) {
  if (!name) return '';
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

/**
 * @param error - The error object to extract the message from
 * @returns The error message, or an empty string if no message is found
 */
export const getErrorMessage = (error: any) => {
  if (error?.response?.data?.message) {
    return error?.response?.data?.message;
  }

  if (error?.response?.data?.errors) {
    return Object.values(error?.response?.data?.errors).flat().join(', ');
  }

  return error?.message || 'Xatolik yuz berdi';
};

export const getFormErrorMessage = (error: any) => {
  if (error?.message) {
    return error?.message;
  }

  if (error?.startDate) {
    return error?.startDate?.message;
  }

  if (error?.endDate) {
    return error?.endDate?.message;
  }

  if (error?.startTime) {
    return error?.startTime?.message;
  }

  if (error?.endTime) {
    return error?.endTime?.message;
  }

  return 'Xatolik yuz berdi';
};

export const getImageUrl = (file: IFileResponse | null) => {
  if (!file) return '';
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/image/${file?.day}/${file?.path}`;
};

export const formatDate = (
  date: string,
  { format = 'DD.MM.YYYY', currentFormat }: { format?: string; currentFormat?: string } = {}
) => {
  return date ? dayjs(date, currentFormat).format(format) : '';
};

export const formatTime = (time: string) => {
  return time ? dayjs(time).format('HH:mm') : '';
};

/**
 *
 * @param lat
 * @param lon
 * @returns
 */
export function getYandexLocationLink(lat?: string, lon?: string, zoom = 16) {
  return `https://yandex.com/maps/?ll=${lon},${lat}&z=${zoom}&pt=${lon},${lat},pm2rdm`;
}

export const formReachText = (text: string) => {
  if (!text) return '';

  // Ruxsat etilgan taglar: <strong>, <em>, <code>, <a>, <p>, <br>
  const allowedTags = /<\/?(?:strong|em|code|a|p|br)(?:\s[^>]*)?>|<a\s[^>]*>/gi;

  // Barcha ruxsat etilgan taglarni vaqtincha saqlash
  const tagPlaceholders: string[] = [];
  let processedText = text.replace(allowedTags, (match) => {
    const placeholder = `___TAG_${tagPlaceholders.length}___`;
    tagPlaceholders.push(match);
    return placeholder;
  });

  // Qolgan barcha taglarni olib tashlash
  processedText = processedText.replace(/<[^>]*>/g, '');

  // Placeholderlarni qaytarish
  tagPlaceholders.forEach((tag, index) => {
    processedText = processedText.replace(`___TAG_${index}___`, tag);
  });

  // Konvertatsiya qilish
  return processedText
    .replace(/<strong>/g, '<b>')
    .replace(/<\/strong>/g, '</b>')
    .replace(/<em>/g, '<i>')
    .replace(/<\/em>/g, '</i>')
    .replace(/<p>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/<\/p>/g, '\n')
    .replace(/<br>/g, '\n')
    .replace(/<a target="_blank" rel="noopener noreferrer nofollow"/g, '<a');
};

export const reformReachText = (formattedText: string) => {
  if (!formattedText) return '';
  return formattedText
    .replace(/<b>/g, '<strong>')
    .replace(/<\/b>/g, '</strong>')
    .replace(/<i>/g, '<em>')
    .replace(/<\/i>/g, '</em>')
    .replace(/\n/g, '<br>')
    .replace(/<a/g, '<a target="_blank" rel="noopener noreferrer nofollow"');
};
