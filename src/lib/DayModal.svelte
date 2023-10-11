<script lang="ts">
	import { XCircle } from 'lucide-svelte';

	export let selectedDay: DayData | undefined = undefined;

	const formatter = new Intl.DateTimeFormat('de-DE', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
</script>

<div
	role="dialog"
	class="modal modal-bottom sm:modal-middle"
	class:modal-open={selectedDay}
	on:click|self={() => (selectedDay = undefined)}
>
	<div class="modal-box min-h-[50%] md:min-h-fit max-h-[75%]">
		<label
			for="my-modal-3"
			class="absolute right-2 top-2 text-primary"
			on:click={() => (selectedDay = undefined)}
		>
			<XCircle />
		</label>

		<h3 class="font-bold text-lg my-3">{formatter.format(selectedDay?.date)}</h3>

		{#each selectedDay?.events ?? [] as event}
			<div
				class="grid md:text-lg text-gray-500 gap-2 mb-3"
				style="grid-template-columns: min-content auto;"
			>
				<span>
					{event.start.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
				</span>
				<p class="font-bold">
					{event.name}
				</p>
				<span class="break-words" style="grid-area: 2/2;">
					{event.location ?? ''}
				</span>
			</div>
		{/each}
	</div>
</div>
