import { EventHandler } from '../EventHandler';
import { Game } from '../Game';
import { IPluginOptions } from './IPluginOptions';

/**
 * A base plugin class. Extend this to create your own plugins!
 * @author RailRunner16
 */
export abstract class Plugin {
	private events: Map<string, EventHandler>;
	public readonly name: string;
	public readonly dependencies?: string[] = [];
	protected game?: Game;

	/**
	 * Create a new plugin
	 * @param {string} name The name of the plugin
	 * @param {IPluginOptions} options Any options for the plugin
	 */
	constructor(name: string, options?: IPluginOptions) {
		this.name = name;
		this.events = new Map<string, EventHandler>();

		this.dependencies = options && options.dependencies;
	}

	/**
	 * Register an event handler on this plugin
	 * @param {string} eventName The name of the event to register a handler for
	 * @param {EventHandler} handler The handler to register
	 */
	protected on(eventName: string, handler: EventHandler): void {
		this.events.set(eventName, handler);
	}

	/**
	 * Dispatch an event to this plugin
	 * @param {string} eventName The name of the event to dispatch
	 * @param {*} data Any data that should be sent with the event as a payload
	 */
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

	/**
	 * Sets the current game inside the plugin. Used internally by the {@link Game} class in order to provide an instance of the game for plugin code to work with. ***NEVER USE THIS MANUALLY!!!***
	 * @param {Game} game The game that the plugin is installed in
	 */
	public setGame(game: Game): void {
		this.game = game;
	}

	/**
	 * Initialize the plugin. A good place to register event handlers.
	 */
	public abstract init(): void;
}