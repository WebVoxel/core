import { IGameOptions } from './IGameOptions';
import { Plugin } from './plugin/Plugin';
import * as THREE from 'three';
import { World } from './world/World';
export declare class Game {
    plugins: Map<string, Plugin>;
    private readonly _renderer?;
    readonly camera: THREE.PerspectiveCamera;
    currentWorld: World;
    constructor(options: IGameOptions);
    private dispatchEventToAllPlugins;
    getPlugin(name: string): Plugin;
    private animate;
    start(): void;
    get renderer(): THREE.WebGLRenderer;
}
