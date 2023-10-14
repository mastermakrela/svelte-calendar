import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { derived, readonly } from 'svelte/store';
import { daysForLocale } from './helpfunctions.js';

export const MONTH_QUERY = 'calendar_month';
export const weekdays = daysForLocale('de-DE');

// Helpers

// This function returns an array of dates in a given month and year.
// The function takes two parameters, `month` and `year`, which are both integers.
// The function returns an array of `Date` objects.
/**
 *
 * @param {number} month
 * @param {number} year
 * @returns {Date[]}
 */
function daysInMonth(month, year) {
	/** @type {Date[]} */
	const days = [];
	const date = new Date(year, month + 1, 0);
	const daysInMonth = date.getDate();

	for (let day = 1; day <= daysInMonth; day++) {
		const date = new Date(year, month, day);
		days.push(date);
	}
	return days;
}

// State

const title_formatter_no_year = Intl.DateTimeFormat('de-DE', {
	month: 'long'
});
const title_formatter_year = Intl.DateTimeFormat('de-DE', {
	year: 'numeric',
	month: 'long'
});

const current_year = new Date().getFullYear();
const current_month_query = `${current_year}-${new Date().getMonth()}`;

const stateExtension = derived(page, (state) => {
	const url = new URL(state.url);
	const searchParams = url.searchParams;
	const month_query = searchParams.get(MONTH_QUERY) ?? current_month_query;

	const [year, month] = month_query.split('-').map((x) => parseInt(x));
	const days = daysInMonth(month, year);

	const previous_month = new Date(year, month - 1);
	const next_month = new Date(year, month + 1);

	const previous_month_query = `${previous_month.getFullYear()}-${previous_month.getMonth()}`;
	const next_month_query = `${next_month.getFullYear()}-${next_month.getMonth()}`;

	const selected_day = searchParams.get('selected_day');

	return {
		year,
		month,
		days,
		selected_day,
		get blankDaysCount() {
			return (new Date(year, month).getDay() - 1 + 7) % 7;
		},
		get title() {
			const formatter = year !== current_year ? title_formatter_year : title_formatter_no_year;
			return formatter.format(new Date(year, month));
		},
		links: {
			get previous() {
				url.searchParams.set(MONTH_QUERY, previous_month_query);
				return url.href;
			},
			get next() {
				url.searchParams.set(MONTH_QUERY, next_month_query);
				return url.href;
			}
		},
		actions: {
			previous() {
				url.searchParams.set(MONTH_QUERY, previous_month_query);
				url.searchParams.delete('selected_day');
				goto(url, { noScroll: true });
			},
			next() {
				url.searchParams.set(MONTH_QUERY, next_month_query);
				url.searchParams.delete('selected_day');
				goto(url, { noScroll: true });
			},
			today() {
				url.searchParams.delete(MONTH_QUERY);
				url.searchParams.delete('selected_day');
				goto(url, { noScroll: true });
			}
		}
	};
});

export const calendarState = readonly(stateExtension);
