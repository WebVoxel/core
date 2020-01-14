import { IGameOptions } from './IGameOptions';
import { Plugin } from './plugin/Plugin';
import * as THREE from 'three';
import { World } from './world/World';
/**
 * A WebVoxel game
 * @author RailRunner16
 */
export declare class Game {
    plugins: Map<string, Plugin>;
    private readonly _renderer;
    readonly camera: THREE.PerspectiveCamera;
    currentWorld: World;
    /**
     * Create a new game
     * @param {IGameOptions} options The options to instantiate the game with
     */
    constructor(options: IGameOptions);
    /**
     * Broadcast an event to all the installed plugins.
     * @param {string} eventName The name of the event.
     * @param {*} data Any data to send with the event
     */
    dispatchEventToAllPlugins(eventName: string, data?: any): void;
    /**
     * Get a plugin's instance
     * @param {string} name The name of the plugin
     */
    getPlugin(name: string): Plugin | null;
    /**
     * The internal animation loop. This method, when called passes itself to the renderer's `setAnimationLoop` function, causing it to loop whenever the page is in focus. For this reason, it is private and should **NOT** be called manually as the game already handles this.
     */
    private animate;
    /**
     * An event handler that gets called when the window is resized.
     */
    private onWindowResize;
    /**
     * Start the game.
     */
    start(): void;
    /**
     * The renderer
     */
    get renderer(): THREE.WebGLRenderer;
}
