<script lang="ts">
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import Day from './Day.svelte';
	import { weekdays } from './calendar.js';

	export let calendarState;

	$: ({ blankDaysCount, title, days, links, actions, selected_day } = $calendarState);
</script>

<div class="contentWidth">
	<div class="flex justify-between items-center">
		<h1 class="font-bold text-3xl">{title}</h1>

		<a
			class="today-button"
			href="?"
			on:click|preventDefault={actions.today}
			data-sveltekit-noscroll
		>
			Heute
		</a>
	</div>
	<div class="my-4 grid grid-cols-3 calendar transform">
		<a
			class="button"
			href={links.previous}
			on:click|preventDefault={actions.previous}
			data-sveltekit-noscroll
		>
			<ChevronLeft />
		</a>

		<div class="grid grid-cols-7 gap-2 p-2">
			{#each weekdays as weekday}
				<div class="font-semibold my-2">{weekday}</div>
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
			class="button"
			href={links.next}
			on:click|preventDefault={actions.next}
			data-sveltekit-noscroll
		>
			<ChevronRight />
		</a>
	</div>
</div>

<style style lang="postcss">
	.calendar {
		grid-template-columns: min-content auto min-content;
	}

	.button {
		@apply h-full hover:bg-opacity-10 hover:bg-gray-500 hover:shadow rounded;
		@apply flex items-center justify-center;
	}

	.today-button {
		border-radius: 9999px;
		padding-left: 0.5rem;
		padding-right: 0.5rem;

		background-color: var(--calendar-accent, #ba1904);
		color: var(--calendar-on-accent, #ffffff);
	}
</style>
