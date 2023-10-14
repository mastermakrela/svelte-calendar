<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { isToday } from './helpfunctions.js';

	export let date: Date;

	let url: URL;

	$: date_string = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

	$: {
		url = new URL($page.url);
		url.searchParams.set('selected_day', date_string);
	}

	const onclick = () => goto(url, { noScroll: true });
</script>

<a
	class="day-box cursor-pointer"
	href={url.href}
	on:click|preventDefault={onclick}
	data-sveltekit-noscroll
>
	<div class="day-number" class:today={isToday(date)}>
		{date.getDate()}
	</div>

	<slot />
</a>

<style style lang="postcss">
	.day-box {
		width: 100%;
		padding: 0.25rem;
		background-color: white;
		border: 0.25px solid #d1d5db;
		border-radius: 0.25rem;

		cursor: default;

		display: grid;
		grid-template-rows: max-content auto;
		flex-direction: column;
		place-items: center;

		@apply shadow-md;
	}

	.day-box.cursor-pointer {
		cursor: pointer;
	}

	.day-box:hover {
		transform: scale(1.05);
	}

	.day-box {
		aspect-ratio: 1 / 1;
	}

	@media (min-width: 768px) {
		.day-box {
			aspect-ratio: auto;
			min-height: clamp(6rem, 10vh, 10vh);
			place-items: start;
		}
	}

	.day-number {
		justify-self: center;

		@apply w-6 h-6
            inline-flex items-center justify-center
            leading-none text-sm
            rounded-full;
	}

	.day-number.today {
		background-color: var(--calendar-accent, #ba1904);
		color: var(--calendar-on-accent, #ffffff);
	}

	@media (min-width: 768px) {
		.day-number {
			justify-self: start;
		}
	}
</style>
