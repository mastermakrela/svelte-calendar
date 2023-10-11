<script lang="ts">
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { daysForLocale, isToday } from './helpfunctions.js';

	export let calendarState;
	export let selectedDay: DayData | undefined = undefined;
	export let events: CalendarEvent[] = [];

	const weekdays = daysForLocale('de-DE');

	$: ({ blankDaysCount, title, days } = $calendarState);

	$: eventsToday = events.filter((e) => isToday(e.start));
</script>

{#if eventsToday.length > 0}
	<div class="contentWidth mt-8">
		<h2 class="font-bold text-2xl mb-2">Heute</h2>

		{#each eventsToday as event}
			<div
				class="grid md:text-lg text-gray-500 gap-1 gap-x-2 mb-3"
				style="grid-template-columns: min-content auto;"
			>
				<span>
					{event.start.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
				</span>
				<p class="font-bold">
					{event.name}
				</p>
				<span class="break-words text-sm" style="grid-area: 2/2;">
					{event.location ?? ''}
				</span>
			</div>
		{/each}
	</div>
{/if}

<div class="my-8">
	<div class="contentWidth flex justify-between items-center mb-4">
		<h1 class="font-bold text-2xl">{title}</h1>

		<div class="inline-flex space-x-1">
			<button on:click={calendarState.previous}>
				<ChevronLeft />
			</button>

			<button class="bg-primary text-white rounded-full px-2" on:click={calendarState.today}>
				Heute
			</button>

			<button on:click={calendarState.next}>
				<ChevronRight />
			</button>
		</div>
	</div>

	<div class="sm:contentWidth grid grid-cols-7 gap-1 m-1">
		{#each weekdays as weekday}
			<div class="font-semibold text-sm">{weekday}</div>
		{/each}

		{#each Array(blankDaysCount) as _}
			<div class="w-full aspect-square" />
		{/each}

		{#each days as _day}
			{@const day = { date: _day, events: [] }}
			<button
				class="dayBox"
				class:today={isToday(day.date)}
				on:click={() => {
					if (!(day.events.length > 0)) return;
					selectedDay = day;
				}}
			>
				<div class="dayNumber" class:today={isToday(day.date)}>
					{day.date.getDate()}
				</div>
				<div class="flex space-x-1">
					<slot />
				</div>
			</button>
		{/each}
	</div>
</div>

<style style lang="postcss">
	.dayBox {
		@apply w-full aspect-square
           grid place-items-center grid-rows-2
         bg-white rounded shadow-md border-[0.25px] border-gray-300 
           transform hover:scale-105 cursor-pointer;
	}

	.dayBox.today {
		@apply bg-primary border-black;
	}

	.dayNumber {
		@apply w-6 h-6
            inline-flex items-center justify-center
            text-center leading-none text-sm
            text-black;
	}

	.dayNumber.today {
		@apply text-white;
	}
</style>
