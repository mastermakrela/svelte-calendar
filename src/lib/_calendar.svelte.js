import { page } from '$app/stores';
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

export class CalendarState {
	#current_year;
	#current_month_query;

	/** @type {URL} */
	url = $state();

	constructor() {
		this.#current_year = new Date().getFullYear();
		this.#current_month_query = `${this.#current_year}-${new Date().getMonth()}`;

		page.subscribe((value) => {
			console.log('🚀 ~ page.subscribe ~ value:', value.url);
			this.url = value.url;
		});
	}

	get #searchParams() {
		return this.url.searchParams;
	}

	get #month_query() {
		return this.#searchParams.get(MONTH_QUERY) ?? this.#current_month_query;
	}

	get #year() {
		return parseInt(this.#month_query.split('-')[0]);
	}

	get #month() {
		return parseInt(this.#month_query.split('-')[1]);
	}

	get title() {
		const formatter =
			this.#year !== this.#current_year ? title_formatter_year : title_formatter_no_year;
		return formatter.format(new Date(this.#year, this.#month));
	}

	get blank_days_count() {
		return (new Date(this.#year, this.#month).getDay() - 1 + 7) % 7;
	}

	get days() {
		return daysInMonth(this.#month, this.#year);
	}

	get selected_day() {
		return this.#searchParams.get('selected_day');
	}

	get #previous_link() {
		const previous_month = new Date(this.#year, this.#month - 1);
		const previous_month_query = `${previous_month.getFullYear()}-${previous_month.getMonth()}`;
		const previous_url = new URL(this.url);
		previous_url.searchParams.set(MONTH_QUERY, previous_month_query);
		return previous_url.href;
	}

	get #next_link() {
		const next_month = new Date(this.#year, this.#month + 1);
		const next_month_query = `${next_month.getFullYear()}-${next_month.getMonth()}`;
		const next_url = new URL(this.url);
		next_url.searchParams.set(MONTH_QUERY, next_month_query);
		return next_url.href;
	}

	get links() {
		return {
			previous: this.#previous_link,
			next: this.#next_link
		};
	}

	get close_link() {
		const close_url = new URL(this.url);
		close_url.searchParams.delete('selected_day');
		return close_url.href;
	}
}
