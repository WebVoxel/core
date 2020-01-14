import { AbstractLoader, OnProgress, OnError } from "../util/AbstractLoader";
import { World } from "./World";
declare type OnLoad = (world: World) => void;
export declare class WorldLoader extends AbstractLoader {
    load(url: string, onLoad?: OnLoad, onProgress?: OnProgress, onError?: OnError): any;
}
export {};
