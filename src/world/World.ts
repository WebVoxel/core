import * as THREE from 'three';
import { Block } from '../block/Block';

export class World {
	public scene: THREE.Scene;
	public blocks: Block[] = [];

	constructor() {
		this.scene = new THREE.Scene();
	}


	public addBlock(b: Block): void {
		this.blocks.push(b);
	}

	public render(): void {
		for (const b of this.blocks) {
			const geometry = new THREE.BoxGeometry(1, 1, 1);
			const material = new THREE.MeshStandardMaterial({
				color: 0xff0000,
			});

			const blockMesh = new THREE.Mesh(geometry, material);
			blockMesh.position.x = b.coords.x;
			blockMesh.position.y = b.coords.y;
			blockMesh.position.z = b.coords.z;

			this.scene.add(blockMesh);
		}
	}
}