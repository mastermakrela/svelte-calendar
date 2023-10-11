/**
 *
 * @param {string} localeName
 * @param {'long' | 'short' | 'narrow'} weekday
 * @returns {string[]}
 */
export function daysForLocale(localeName = 'en-EN', weekday = 'short') {
	const format = new Intl.DateTimeFormat(localeName, { weekday }).format;
	return [...Array(7).keys()].map((day) => format(new Date(Date.UTC(2021, 5, day))));
}

/**
 *
 * @param {string} localeName
 * @param {'long' | 'short' | 'narrow' | 'numeric' | '2-digit'} month
 * @returns {string[]}
 */
export function monthsForLocale(localeName = 'en-EN', month = 'short') {
	const format = new Intl.DateTimeFormat(localeName, { month }).format;
	return [...Array(12).keys()].map((month) => format(new Date(Date.UTC(2021, month))));
}

/**
 * Returns true if the date parameter is today, false otherwise.
 * @param {Date} date
 */
export const isToday = (date) => {
	const today = new Date();
	return (
		date.getDate() === today.getDate() &&
		date.getMonth() === today.getMonth() &&
		date.getFullYear() === today.getFullYear()
	);
};

/**
 * Checks if two dates are the same day.
 *
 * @param {Date} a - The first date to compare.
 * @param {Date} b - The second date to compare.
 * @returns {boolean} - Returns true if both dates are the same day, false otherwise.
 */
export const sameDay = (a, b) => {
	return (
		a.getFullYear() === b.getFullYear() &&
		a.getMonth() === b.getMonth() &&
		a.getDate() === b.getDate()
	);
};

/**
 * Checks if a given date is within a specified interval.
 * @param {Date} date - The date to check.
 * @param {Date} start - The start of the interval.
 * @param {Date} end - The end of the interval.
 * @returns {boolean} - True if the date is within the interval, false otherwise.
 */
export const dateInInterval = (date, start, end) => {
	return sameDay(date, start) || sameDay(date, end) || (date > start && date < end);
};
