import * as THREE from 'three';
import { Block } from '../block/Block';
import { Point3D } from '../util/Point3D';
export declare class World {
    scene: THREE.Scene;
    blocks: Map<string, Block>;
    blockMeshes: Map<string, THREE.Mesh>;
    private skyColor;
    private light;
    constructor();
    protected static formatListKey(position: Point3D): string;
    addBlock(b: Block): void;
    getBlock(position: Point3D): Block;
    render(): void;
    setSkyColor(skyColor: THREE.Color): void;
    animate(): void;
}
