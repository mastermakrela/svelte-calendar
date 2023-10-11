<script>
	import Calendar from '$lib/CalendarBig.svelte';
	import CalendarList from '$lib/CalendarList.svelte';
	import { calendarState } from './calendar.js';

	const events = [];
</script>

<div class="hidden md:block">
	<Calendar {calendarState}>
		<svelte:fragment slot="day" let:date>
			<ul>
				<li>item 1</li>
				<li>item 2</li>
			</ul>
		</svelte:fragment>

		<svelte:fragment slot="dialog" let:close let:close_link let:selected_day>
			<div>
				<p>{selected_day}</p>
				<a href={close_link} on:click|preventDefault={close}> close </a>
			</div>
		</svelte:fragment>
	</Calendar>
</div>

<div class="block md:hidden">
	<CalendarList {calendarState} />
</div>
