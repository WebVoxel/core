import { BoxGeometry, Mesh, MeshStandardMaterial, Scene } from 'three';
import { Block } from '../block/Block';

export class World {
	public scene: Scene;
	public blocks: Block[] = [];

	constructor() {
		this.scene = new Scene();
	}


	public addBlock(b: Block): void {
		this.blocks.push(b);
	}

	public render(): void {
		for (const b of this.blocks) {
			const geometry = new BoxGeometry(1, 1, 1);
			const material = new MeshStandardMaterial({
				color: 0xeeeeee,
			});

			const blockMesh = new Mesh(geometry, material);
			blockMesh.position.x = b.coords.x;
			blockMesh.position.y = b.coords.y;
			blockMesh.position.z = b.coords.z;

			this.scene.add(blockMesh);
		}
	}
}