<script lang="ts">
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import Day from './Day.svelte';
	import { CalendarState, weekdays } from './_calendar.svelte.js';

	let { day, dialog } = $props<{
		day: Snippet<Date>;
		dialog?: Snippet<{ close_link: string; selected_day: string }>;
	}>();

	const cal = new CalendarState();
</script>

<div>
	<div class="header">
		<h1>{cal.title}</h1>

		<div class="buttons">
			<a class="button" href={cal.links.previous} data-sveltekit-noscroll>
				<ChevronLeft />
			</a>

			<a class="today-button" href="?" data-sveltekit-noscroll> Heute </a>

			<a class="button" href={cal.links.next} data-sveltekit-noscroll>
				<ChevronRight />
			</a>
		</div>
	</div>

	<div class="calendar">
		<a class="button big" href={cal.links.previous} data-sveltekit-noscroll>
			<ChevronLeft />
		</a>

		<div class="days flex-grow">
			{#each weekdays as weekday}
				<div class="weekdays">{weekday}</div>
			{/each}

			{#each Array(cal.blank_days_count) as _}
				<div />
			{/each}

			{#each cal.days as date (date)}
				<Day {date} url={new URL(cal.url)}>
					{@render day(date)}
				</Day>
			{/each}
		</div>

		<a class="button big" href={cal.links.next} data-sveltekit-noscroll>
			<ChevronRight />
		</a>
	</div>
</div>

{#if cal.selected_day}
	{#if dialog}
		{@render dialog({ close_link: cal.close_link, selected_day: cal.selected_day })}
	{:else}
		<dialog open>
			<p>{cal.selected_day}</p>
			<a href={cal.close_link}> close </a>
		</dialog>
	{/if}
{/if}

<style style lang="postcss">
	h1 {
		@apply font-bold text-3xl;
	}

	.header {
		@apply flex justify-between items-center;
	}

	.weekdays {
		@apply font-semibold my-2;
	}

	.buttons {
		@apply inline-flex space-x-1;
	}

	.button {
		@apply h-full hover:bg-opacity-10 hover:bg-gray-500 hover:shadow rounded;
		@apply flex items-center justify-center;
	}

	.button.big {
		@apply hidden md:flex;
	}

	.today-button {
		@apply rounded-full px-2;

		background-color: var(--calendar-accent, #ba1904);
		color: var(--calendar-on-accent, #ffffff);
	}

	.calendar {
		@apply my-4 grid grid-cols-1 md:grid-cols-3 transform;
	}

	.days {
		@apply grid grid-cols-7 gap-1 m-1;
	}

	@media (min-width: 768px) {
		.header .button {
			@apply hidden;
		}

		.calendar {
			grid-template-columns: max-content auto max-content;
		}

		.days {
			@apply grid grid-cols-7 gap-2 p-2;
		}
	}

	dialog {
		position: fixed;
		margin: auto;
		padding: 0;
		inset: 0;
		z-index: 100;
		@apply min-w-[300px] max-w-[600px] bg-slate-200 rounded-lg p-4 min-h-[200px] max-h-[400px] overflow-y-auto;
	}
</style>
