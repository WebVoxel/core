import { AbstractLoader, OnProgress, OnError } from "../util/AbstractLoader";
import { World } from "./World";
declare type OnLoad = (world: World) => void;
/**
 * A world loader.
 * @author RailRunner16
 *
 * @example
 * new WorldLoader().load('/path/to/world.json', world => {
 *     const game = new Game({
 *         initialWorld: world,
 *     });
 * });
 */
export declare class WorldLoader extends AbstractLoader {
    /**
     * Load a world JSON file
     * @param url The URL of the world JSON file to load
     * @param onLoad The function to call when the world is loaded
     * @param onProgress The function to call when the loader makes progress
     * @param onError The function to call when the loader encounters an error
     */
    load(url: string, onLoad?: OnLoad, onProgress?: OnProgress, onError?: OnError): any;
}
export {};
