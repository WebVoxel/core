import { EventHandler } from '../EventHandler';
import { Game } from '../Game';
import { IPluginOptions } from './IPluginOptions';

export abstract class Plugin {
	private events: Map<string, EventHandler>;
	public readonly name: string;
	public readonly dependencies?: string[] = [];
	protected game?: Game;

	constructor(name: string, options?: IPluginOptions) {
		this.name = name;
		this.events = new Map<string, EventHandler>();

		this.dependencies = options && options.dependencies;
	}

	protected on(eventName: string, handler: EventHandler): void {
		this.events.set(eventName, handler);
	}

	public dispatch(eventName: string, data: any): void {
		if (!this.events.has(eventName)) return;
		const handler = this.events.get(eventName);

		if (handler === null || handler === undefined) {
			console.warn("Event handler was null or undefined. Skipping...");
			return;
		} else if (typeof handler !== 'function') {
			console.warn("Attempted to handle event with non-function event handler.");
			return;
		} else handler(data);
	}

	public setGame(game: Game): void {
		this.game = game;
	}

	public abstract init(): void;
}