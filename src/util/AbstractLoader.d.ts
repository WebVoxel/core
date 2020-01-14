import { LoadingManager } from "three";
export declare type OnLoad = (response: any) => void;
export declare type OnProgress = (request: ProgressEvent) => void;
export declare type OnError = (error: any) => void;
/**
 * A basic loader class to be used in creating more advanced loaders for data such as world data, block data, and textures.
 * @author RailRunner16
 */
export declare abstract class AbstractLoader {
    manager: LoadingManager;
    path: string;
    /**
     * Create a new loader.
     * @param {LoadingManager} manager The loading manager to use with this loader. Defaults to THREE's `DefaultLoadingManager`
     */
    constructor(manager?: LoadingManager);
    /**
     * Load a URL
     * @param {string} url The URL to load
     * @param {Function} onLoad The callback to call once the data has been loaded
     * @param {Function} onProgress The callback to call when the loader makes progress
     * @param {Function} onError The callback to call when the loader encounters an error
     */
    abstract load(url: string, onLoad?: OnLoad, onProgress?: OnProgress, onError?: OnError): any;
    /**
     * Set the path of the loader
     * @param {String} value The new path
     */
    setPath(value: string): this;
}
