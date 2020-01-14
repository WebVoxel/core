import { AbstractLoader, OnProgress, OnError } from "../util/AbstractLoader";
import { FileLoader } from "three";
import { World } from "./World";

type OnLoad = (world: World) => void;

export class WorldLoader extends AbstractLoader {
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