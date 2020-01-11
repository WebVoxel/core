import { EventHandler } from '../EventHandler';

export abstract class Plugin {
	private events: Map<string, EventHandler> = new Map<string, EventHandler>();
	public readonly name: string;

	constructor(name: string) {
		this.name = name;
	}

	protected on(eventName: string, handler: EventHandler): void {
		this.events.set(eventName, handler);
	}

	public dispatch(eventName: string, data: any): void {
		const handler = this.events.get(eventName);

		if (handler === null || handler === undefined) {
			console.warn("Event handler was null or undefined. Skipping...");
			return;
		} else if (typeof handler !== 'function') {
			console.warn("Attempted to handle event with non-function event handler.");
			return;
		} else handler(data);
	}
}