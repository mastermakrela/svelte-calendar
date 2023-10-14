<script lang="ts">
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import Day from './Day.svelte';
	import { weekdays } from './calendar.js';

	export let calendarState;

	$: ({ blankDaysCount, title, days, links, actions } = $calendarState);
</script>

<div class="my-8">
	<div class="contentWidth flex justify-between items-center mb-4">
		<h1 class="font-bold text-2xl">{title}</h1>

		<div class="inline-flex space-x-1">
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

	<div class="sm:contentWidth grid grid-cols-7 gap-1 m-1">
		{#each weekdays as weekday}
			<div class="font-semibold text-sm">{weekday}</div>
		{/each}

		{#each Array(blankDaysCount) as _}
			<div class="w-full aspect-square" />
		{/each}

		{#each days as date}
			<Day {date}>
				<slot {date} />
			</Day>
		{/each}
	</div>
</div>

<style>
	.today-button {
		border-radius: 9999px;
		padding-left: 0.5rem;
		padding-right: 0.5rem;

		background-color: var(--calendar-accent, #ba1904);
		color: var(--calendar-on-accent, #ffffff);
	}
</style>
