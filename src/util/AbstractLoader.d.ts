import { LoadingManager } from "three";
export declare type OnLoad = (response: any) => void;
export declare type OnProgress = (request: ProgressEvent) => void;
export declare type OnError = (error: any) => void;
export declare abstract class AbstractLoader {
    manager: LoadingManager;
    path: string;
    constructor(manager?: LoadingManager);
    abstract load(url: string, onLoad?: OnLoad, onProgress?: OnProgress, onError?: OnError): any;
    setPath(value: string): this;
}
