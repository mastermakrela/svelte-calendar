<script lang="ts">
	import { page } from '$app/stores';
	import Calendar from '$lib/Calendar.svelte';
	import { isToday } from '$lib/helpfunctions.js';
	import { get } from 'svelte/store';

	let _url = $state(get(page).url);

	page.subscribe((value) => (_url = value.url));
</script>

<div class="grid items-center h-[100dvh] w-[100dvw]">
	<div class="m-2 md:mx-auto md:w-4/5">
		<Calendar>
			{#snippet day(date)}
				{#if isToday(date)}
					<div class="block md:hidden">
						<div class="text-xs bg-black w-2 h-2 rounded-full" />
					</div>
					<div class="hidden md:block pl-1 mt-2 text-sm text-left">
						<ul>
							<li>item 1</li>
							<li>item 2</li>
							<li>item 3</li>
						</ul>
					</div>
				{/if}
			{/snippet}

			{#snippet dialog({ close_link, selected_day })}
				<dialog open>
					<p>{selected_day}</p>
					<a href={close_link}> close </a>
					<ul>
						<li>item 1</li>
						<li>item 2</li>
						<li>item 3</li>
					</ul>
				</dialog>
			{/snippet}
		</Calendar>
	</div>
</div>

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
