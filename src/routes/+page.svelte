<script lang="ts">
	import Calendar from '$lib/Calendar.svelte';
	import { isToday } from '$lib/helpfunctions.js';
</script>

<div class="grid items-center h-[100dvh] w-[100dvw]">
	<div class="m-2 md:mx-auto md:w-4/5">
		<Calendar>
			<svelte:fragment let:date>
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
			</svelte:fragment>
		</Calendar>
	</div>
</div>
