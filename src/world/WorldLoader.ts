import { AbstractLoader, OnProgress, OnError } from "../util/AbstractLoader";
import { FileLoader } from "three";
import { World } from "./World";

type OnLoad = (world: World) => void;

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
export class WorldLoader extends AbstractLoader {
    /**
     * Load a world JSON file
     * @param url The URL of the world JSON file to load
     * @param onLoad The function to call when the world is loaded
     * @param onProgress The function to call when the loader makes progress
     * @param onError The function to call when the loader encounters an error
     */
    public load(url: string, onLoad?: OnLoad, onProgress?: OnProgress, onError?: OnError): any {
        const loader = new FileLoader(this.manager);
		loader.setPath(this.path);
        loader.setResponseType('json');
        
        const handleLoad = (worldData: any): void => {
            try {
                worldData = JSON.parse(worldData);
                if (onLoad) onLoad(new World(worldData));
            } catch(err) {
                if (onError) onError(err);
            }
        }

        loader.load(url, handleLoad, onProgress, onError);
    }
}