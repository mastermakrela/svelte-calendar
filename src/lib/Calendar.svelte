<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import Day from './Day.svelte';
	import { calendarState, weekdays } from './calendar.js';

	let close_link;

	$: ({ selected_day } = $calendarState);
	$: ({ blankDaysCount, title, days, links, actions } = $calendarState);

	$: {
		const og_url = new URL($page.url);
		og_url.searchParams.delete('selected_day');
		close_link = og_url.href;
	}

	const close = () => goto(close_link, { noScroll: true });
</script>

<div>
	<div class="header">
		<h1>{title}</h1>

		<div class="buttons">
			<a
				class="button"
				href={links.previous}
				on:click|preventDefault={actions.previous}
				data-sveltekit-noscroll
			>
				<ChevronLeft />
			</a>

			<a
				class="today-button"
				href="?"
				on:click|preventDefault={actions.today}
				data-sveltekit-noscroll
			>
				Heute
			</a>

			<a
				class="button"
				href={links.next}
				on:click|preventDefault={actions.next}
				data-sveltekit-noscroll
			>
				<ChevronRight />
			</a>
		</div>
	</div>

	<div class="calendar">
		<a
			class="button big"
			href={links.previous}
			on:click|preventDefault={actions.previous}
			data-sveltekit-noscroll
		>
			<ChevronLeft />
		</a>

		<div class="days flex-grow">
			{#each weekdays as weekday}
				<div class="weekdays">{weekday}</div>
			{/each}

			{#each Array(blankDaysCount) as _}
				<div />
			{/each}

			{#each days as date}
				<Day {date}>
					<slot {date} />
				</Day>
			{/each}
		</div>

		<a
			class="button big"
			href={links.next}
			on:click|preventDefault={actions.next}
			data-sveltekit-noscroll
		>
			<ChevronRight />
		</a>
	</div>
</div>

{#if selected_day}
	<slot name="dialog" {close} {close_link} {selected_day}>
		<dialog open>
			<p>{selected_day}</p>
			<a href={close_link} on:click|preventDefault={close}> close </a>
		</dialog>
	</slot>
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
