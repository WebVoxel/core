import { Block } from '../block/Block';
import { Point3D } from '../util/Point3D';
import { IWorldData } from './IWorldData';
import { Mesh, Scene } from 'three';
import { Game } from '../Game';
import { IJsonable } from '../util/IJsonable';
/**
 * An in game world.
 * @author RailRunner16
 */
export declare class World implements IJsonable {
    static MISSING_TEXTURE: string;
    scene: Scene;
    blocks: Map<string, Block>;
    blockMeshes: Map<string, Mesh>;
    private skyColor;
    private light?;
    private game?;
    /**
     * Create a new world.
     * @param {IWorldData} data The world data to start with. Optional
     */
    constructor(data?: IWorldData);
    /**
     * Applies a game to the world. For internal use only.
     * @param game The game to apply
     */
    setGame(game: Game): void;
    /**
     * Format a key for the map of blocks.
     * @param {Point3D} position The position of the block in the world.
     */
    protected static formatListKey(position: Point3D): string;
    /**
     * Add a block.
     * @param {Block} b The block to add.
     */
    addBlock(b: Block): void;
    /**
     * Get a block at the specified position in the world
     * @param {Point3D} position The position of the block to get
     */
    getBlock(position: Point3D): Block | undefined;
    /**
     * The render method of the world. Never call this manually, as it is called internally by {@link Game}'s render method.
     */
    render(): void;
    /**
     * Set the sky color of the worlda
     * @param {Color} skyColor The new sky color
     */
    setSkyColor(skyColor: THREE.Color): void;
    /**
     * The animation loop of the world. Never call this manually, it is called internally by {@link Game}'s animation loop.
     */
    animate(): void;
    toJson(): IWorldData;
    toJsonString(): string;
}
