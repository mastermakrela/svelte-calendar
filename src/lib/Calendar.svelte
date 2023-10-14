<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import CalendarBig from './CalendarBig.svelte';
	import CalendarSmall from './CalendarSmall.svelte';
	import { calendarState } from './calendar.js';

	let close_link: string;

	$: ({ selected_day } = $calendarState);

	$: {
		const og_url = new URL($page.url);
		og_url.searchParams.delete('selected_day');
		close_link = og_url.href;
	}

	const close = () => goto(close_link, { noScroll: true });
</script>

<div class="hidden md:block">
	<CalendarBig {calendarState}>
		<svelte:fragment let:date>
			<slot {date} />
		</svelte:fragment>
	</CalendarBig>
</div>

<div class="block md:hidden">
	<CalendarSmall {calendarState}>
		<svelte:fragment let:date>
			<slot {date} />
		</svelte:fragment>
	</CalendarSmall>
</div>

{#if selected_day}
	<slot name="dialog" {close} {close_link} {selected_day}>
		<dialog open>
			<p>{selected_day}</p>
			<a href={close_link} on:click|preventDefault={close}> close </a>
		</dialog>
	</slot>
{/if}

<style lang="postcss">
	dialog {
		position: fixed;
		margin: auto;
		padding: 0;
		inset: 0;
		z-index: 100;
		@apply min-w-[300px] max-w-[600px] bg-slate-200 rounded-lg p-4 min-h-[200px] max-h-[400px] overflow-y-auto;
	}
</style>
