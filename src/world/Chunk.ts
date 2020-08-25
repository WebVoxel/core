import { World } from './World';
import { Block } from '..';

export class Chunk {
	chunkX: number;
	chunkZ: number;
	blocks: Map<string, Block> = new Map();

	constructor(chunkX: number = 0, chunkZ: number = 0) {
		this.chunkX = chunkX;
		this.chunkZ = chunkZ
	}

	setBlock(block: Block): void {
		const listKey = World.formatPositionedListKey(block.coords);
		this.blocks.set(listKey, block);
	}

	public static loadOrCreate(world: World, chunkX: number, chunkZ: number): Chunk {
		if (world.hasChunk(chunkX, chunkZ)) return world.getChunk(chunkX, chunkZ)!;
		else {
			world.generateChunk(chunkX, chunkZ);
			return world.getChunk(chunkX, chunkZ)!;
		}
	}
}