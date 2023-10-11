// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	type CalendarEvent = {
		start: Date;
		multiday: boolean;
		name: string;
		all_day: boolean;
		location: string;
		type: 'io' | 'o' | 'ho' | 'acv' | 'cv';
		punctual: boolean;
		internal: boolean;
		date?: Date | undefined;
		end?: Date | undefined;
		other_location?: string | undefined;
	};

	type DayData = {
		date: Date;
		events: CalendarEvent[];
	};

	type EventType = 'io' | 'o' | 'ho' | 'acv' | 'cv';
}

export {};
