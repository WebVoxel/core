import * as THREE from 'three';
import { Block } from '../block/Block';
import { Point3D } from '../util/Point3D';
import { IWorldData } from './IWorldData';

/**
 * An in game world.
 * @author RailRunner16
 */
export class World {
	public scene: THREE.Scene;
	public blocks: Map<string, Block> = new Map<string, Block>();
	public blockMeshes: Map<string, THREE.Mesh> = new Map();
	private skyColor: THREE.Color = new THREE.Color(0x87ceeb);
	private light?: THREE.HemisphereLight;

	/**
	 * Create a new world.
	 * @param {IWorldData} data The world data to start with. Optional
	 */
	constructor(data?: IWorldData) {
		this.scene = new THREE.Scene();

		if (data) for (const blockData of data.blocks) {
			const b = new Block(blockData);
			this.blocks.set(World.formatListKey(b.coords), b);
		}
	}

	/**
	 * Format a key for the map of blocks.
	 * @param {Point3D} position The position of the block in the world.
	 */
	protected static formatListKey(position: Point3D): string {
		return `${position.x}/${position.y}/${position.z}`;
	}

	/**
	 * Add a block.
	 * @param {Block} b The block to add.
	 */
	public addBlock(b: Block): void {
		const listKey = World.formatListKey(b.coords);
		if (this.blocks.has(listKey)) throw new Error(`A block already exists at position: ${listKey}.`);
		this.blocks.set(listKey, b);
	}

	/**
	 * Get a block at the specified position in the world
	 * @param {Point3D} position The position of the block to get
	 */
	public getBlock(position: Point3D): Block | undefined {
		return this.blocks.get(World.formatListKey(position));
	}

	/**
	 * The render method of the world. Never call this manually, as it is called internally by {@link Game}'s render method.
	 */
	public render(): void {
		this.blocks.forEach((b: Block, keyCoords: string) => {
			const geometry = new THREE.BoxGeometry(1, 1, 1);
			const material = new THREE.MeshStandardMaterial({
				color: 0xff0000,
			});

			const blockMesh = new THREE.Mesh(geometry, material);
			this.scene.add(blockMesh);
			this.blockMeshes.set(keyCoords, blockMesh)

			blockMesh.position.x = b.coords.x;
			blockMesh.position.y = b.coords.y;
			blockMesh.position.z = b.coords.z;
		});

		this.light = new THREE.HemisphereLight(this.skyColor);
		this.scene.add(this.light);
	}

	/**
	 * Set the sky color of the worlda
	 * @param {THREE.Color} skyColor The new sky color
	 */
	setSkyColor(skyColor: THREE.Color): void {
		this.skyColor = skyColor;
	}

	/**
	 * The animation loop of the world. Never call this manually, it is called internally by {@link Game}'s animation loop.
	 */
	public animate(): void {
		this.scene.background = this.skyColor;
		this.light!.color = this.skyColor;

		this.blocks.forEach((b: Block, listKey: string) => {
			if (!this.blockMeshes.has(listKey)) return;
			const blockMesh = this.blockMeshes.get(listKey)!;
			blockMesh.position.x = b.coords.x;
			blockMesh.position.y = b.coords.y;
			blockMesh.position.z = b.coords.z;
		});
	}
}