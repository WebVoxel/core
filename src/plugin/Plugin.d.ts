import { EventHandler } from '../EventHandler';
import { Game } from '../Game';
import { IPluginOptions } from './IPluginOptions';
/**
 * A base plugin class. Extend this to create your own plugins!
 * @author RailRunner16
 */
export declare abstract class Plugin {
    private events;
    readonly name: string;
    readonly dependencies?: string[];
    protected game?: Game;
    /**
     * Create a new plugin
     * @param {string} name The name of the plugin
     * @param {IPluginOptions} options Any options for the plugin
     */
    constructor(name: string, options?: IPluginOptions);
    /**
     * Register an event handler on this plugin
     * @param {string} eventName The name of the event to register a handler for
     * @param {EventHandler} handler The handler to register
     */
    protected on(eventName: string, handler: EventHandler): void;
    /**
     * Dispatch an event to this plugin
     * @param {string} eventName The name of the event to dispatch
     * @param {*} data Any data that should be sent with the event as a payload
     */
    dispatch(eventName: string, data: any): void;
    /**
     * Sets the current game inside the plugin. Used internally by the {@link Game} class in order to provide an instance of the game for plugin code to work with. ***NEVER USE THIS MANUALLY!!!***
     * @param {Game} game The game that the plugin is installed in
     */
    setGame(game: Game): void;
    /**
     * Initialize the plugin. A good place to register event handlers.
     */
    abstract init(): void;
}
