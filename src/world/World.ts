import * as THREE from 'three';
import { Block } from '../block/Block';
import { Point3D } from '../util/Point3D';
import { IWorldData } from './IWorldData';

export class World {
	public scene: THREE.Scene;
	public blocks: Map<string, Block> = new Map<string, Block>();
	public blockMeshes: Map<string, THREE.Mesh> = new Map();
	private skyColor: THREE.Color = new THREE.Color(0x87ceeb);
	private light?: THREE.HemisphereLight;

	constructor(data?: IWorldData) {
		this.scene = new THREE.Scene();

		if (data) {
			for (const blockData of data.blocks) {
				const b = new Block(blockData);

				this.blocks.set(World.formatListKey(b.coords), b);
			}
		}
	}

	protected static formatListKey(position: Point3D): string {
		return `${position.x}/${position.y}/${position.z}`;
	}

	public addBlock(b: Block): void {
		this.blocks.set(World.formatListKey(b.coords), b);
	}

	public getBlock(position: Point3D): Block | undefined {
		return this.blocks.get(World.formatListKey(position));
	}

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

	setSkyColor(skyColor: THREE.Color): void {
		this.skyColor = skyColor;
	}

	public animate(): void {
		this.scene.background = this.skyColor;

		this.blocks.forEach((b: Block, listKey: string) => {
			if (!this.blockMeshes.has(listKey)) return;
			const blockMesh = this.blockMeshes.get(listKey)!;
			blockMesh.position.x = b.coords.x;
			blockMesh.position.y = b.coords.y;
			blockMesh.position.z = b.coords.z;
		});
	}
}