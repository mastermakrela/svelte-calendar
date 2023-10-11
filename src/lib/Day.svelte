<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { isToday } from './helpfunctions.js';

	export let date: Date;
	export let selected_day: string;

	const date_string = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
	let close_url: string;
	let url: URL;

	$: {
		url = new URL($page.url);
		url.searchParams.set('selected_day', date_string);

		const _og_url = new URL($page.url);
		_og_url.searchParams.delete('selected_day');
		close_url = _og_url.href;
	}

	const onclick = () => goto(url);
	const close = () => goto(close_url);
</script>

<a
	class="dayBox"
	class:cursor-pointer={$$slots.default}
	href={url.href}
	on:click|preventDefault={onclick}
>
	<div class="date" class:today={isToday(date)}>
		{date.getDate()}
	</div>
	<div style="grid-area: events;" class="pl-1 mt-2 text-sm text-left">
		<slot />
	</div>
</a>

{#if selected_day === date_string}
	<dialog open>
		<slot name="dialog" {close} close_link={close_url} />
	</dialog>
{/if}

<style style lang="postcss">
	.dayBox {
		@apply grid w-full p-1
            bg-white rounded shadow-md 
            border-[0.25px] border-gray-300
            transform hover:scale-105
            cursor-default;

		min-height: clamp(6rem, 10vh, 10vh);

		grid-template-columns: 1fr 3fr;
		grid-template-rows: min-content auto;
		grid-template-areas: 'day text' 'events events';
	}

	.dayBox.pointer {
		cursor: pointer;
	}

	.date {
		@apply w-6 h-6
            inline-flex items-center justify-center
            leading-none text-sm
            rounded-full;
	}

	.date.today {
		background-color: var(--calendar-accent);
		color: var(--calendar-on-accent);
	}

	dialog {
		position: fixed;
		margin: auto;
		padding: 0;
		inset: 0;
		z-index: 100;
	}
</style>
