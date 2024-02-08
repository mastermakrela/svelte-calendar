// Reexport your entry components here

export { default as Calendar } from './Calendar.svelte';

/**
 * Transforms date into `YYYY-MM-DD`
 * @param {Date} date
 */
export function date_string(date) {
	const month = `${date.getMonth() + 1}`.padStart(2, '0');
	const day = `${date.getDate()}`.padStart(2, '0');
	return `${date.getFullYear()}-${month}-${day}`;
}
