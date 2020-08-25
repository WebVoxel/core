import { Block, Identifier } from '..';
import { Point3D } from '..';
import { IWorldData } from './IWorldData';
import { Mesh, Scene, Color, BoxBufferGeometry, TextureLoader, Texture, NearestFilter, DirectionalLight, Light, MeshStandardMaterial, AmbientLight, sRGBEncoding } from 'three';
import _ from 'lodash'
import { Game } from '../Game';
import { IJsonable } from '../util/IJsonable';
import { Chunk } from './Chunk';

/**
 * Remove an item from an array
 * @param arr The array to remove the item from
 * @param toRemove The item to remove
 */
function removeItemFromArray<T>(arr: T[], toRemove: T): T[] {
	for(let i = 0; i < arr.length; i++)
		if (_.isEqual(arr[i], toRemove))
			arr.splice(i, 1);
	return arr;
}

function defaultGenerateFunction(world: World, chunk: Chunk): Block[] {
	let blocks: Block[] = [];

	for (let x = 0; x < 16; x++) {
		for (let z = 0; z < 16; z++) {
			blocks.push(new Block({
				type: world.defaultBlockType,
				coords: new Point3D(x + chunk.chunkX * 16, 0, z + chunk.chunkZ * 16),
			}));
		}
	}

	return blocks;
}

/**
 * An in game world.
 * @author RailRunner16
 */
export class World implements IJsonable {
	public static MISSING_TEXTURE: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAEklEQVQYGWNgYGD4z/AdjBkYABuSA+36eM/zAAAAAElFTkSuQmCC';
	public scene: Scene;
	public chunks: Chunk[] = [];
	public blockMeshes: Map<string, Mesh> = new Map();
	public defaultBlockType: Identifier = new Identifier("dirt");
	private skyColor: Color = new Color(0x87ceeb);
	private light?: Light;
	private game?: Game;
	private generateFun: (world: World, chunk: Chunk) => Block[] = defaultGenerateFunction;

	/**
	 * Create a new world.
	 * @param {IWorldData} data The world data to start with. Optional
	 */
	constructor(data?: IWorldData) {
		this.scene = new Scene();

		if (data) {
			for (const blockData of data.blocks) {
				const b = new Block(blockData);
				this.setBlock(b);
			}

			if (data.skyColor) this.skyColor = new Color().setRGB(data.skyColor.red, data.skyColor.green, data.skyColor.blue);
		}
	}

	/**
	 * Applies a game to the world. For internal use only.
	 * @param game The game to apply
	 */
	public setGame(game: Game): void {
		this.game = game;
	}

	/**
	 * Format a key for the map of blocks.
	 * @param {Point3D} position The position of the block in the world.
	 */
	static formatPositionedListKey(position: Point3D): string {
		return `${position.x}/${position.y}/${position.z}`;
	}

	/**
	 * Set a block.
	 * @param {Block} b The block to add/set.
	 */
	public setBlock(b: Block): void {
		if (this.hasChunkAtBlockPosition(b.coords)) this.getChunkForBlockPosition(b.coords)!.setBlock(b);
		else {
			this.generateChunkAtBlockPosition(b.coords);
			this.getChunkForBlockPosition(b.coords)!.setBlock(b);
		}
	}

	public generateChunkAtBlockPosition(position: Point3D) {
		const normalX = (position.x - (position.x % 16)) / 16
		const normalZ = (position.z - (position.z % 16)) / 16
		this.generateChunk(normalX, normalZ);
	}

	public generateChunk(chunkX: number, chunkZ: number): void {
		const c = new Chunk(chunkX, chunkZ);
		for (const b of this.generateFun(this, c)) c.setBlock(b);
		this.chunks.push(c);
	}

	/**
	 * Get a block at the specified position in the world
	 * @param {Point3D} position The position of the block to get
	 */
	public getBlock(position: Point3D): Block | undefined {
		if (this.hasChunkAtBlockPosition(position)) return this.getChunkForBlockPosition(position)!.blocks.get(World.formatPositionedListKey(position));
		else return undefined;
	}

	public getChunkForBlockPosition(position: Point3D): Chunk | undefined {
		return this.chunks.find(chunk => chunk.blocks.has(World.formatPositionedListKey(position)));
	}

	public hasChunkAtBlockPosition(position: Point3D): boolean {
		return this.getChunkForBlockPosition(position) !== undefined;
	}

	public hasChunk(chunkX: number, chunkZ: number): boolean {
		return this.getChunk(chunkX, chunkZ) !== undefined
	}

	public getChunk(chunkX: number, chunkZ: number): Chunk | undefined {
		return this.chunks.find(chunk => chunk.chunkX === chunkX && chunk.chunkZ === chunkZ)
	}

	/**
	 * The render method of the world. Never call this manually, as it is called internally by {@link Game}'s render method.
	 */
	public render(): void {
		this.chunks.forEach(chunk => {
			chunk.blocks.forEach((b: Block, keyCoords: string) => {
				const textureLoader = new TextureLoader();
				let texture: Texture;

				if (this.game!.textureRoot) texture = textureLoader.load(`${this.game!.textureRoot}/${b.type.namespace}/textures/block/${b.type.key}.png`);
				else texture = textureLoader.load(World.MISSING_TEXTURE);

				texture.magFilter = NearestFilter;
				texture.encoding = sRGBEncoding;

				const geometry = new BoxBufferGeometry(1, 1, 1);
				const material = new MeshStandardMaterial({
					map: texture,
				});

				const blockMesh = new Mesh(geometry, material);
				this.scene.add(blockMesh);
				this.blockMeshes.set(keyCoords, blockMesh)

				blockMesh.position.x = b.coords.x;
				blockMesh.position.y = b.coords.y;
				blockMesh.position.z = b.coords.z;
			});
		});

		const ambientLight = new AmbientLight(0xffffff);
		this.scene.add(ambientLight);

		this.light = new DirectionalLight(0xffffff, 2);
		this.light.position.set(1, 1, 0.5).normalize();
		this.scene.add(this.light);
	}

	/**
	 * Set the sky color of the worlda
	 * @param {Color} skyColor The new sky color
	 */
	setSkyColor(skyColor: Color): void {
		this.skyColor = skyColor;
	}

	/**
	 * The animation loop of the world. Never call this manually, it is called internally by {@link Game}'s animation loop.
	 */
	public animate(): void {
		this.scene.background = this.skyColor;
		this.light!.color = this.skyColor;

		this.chunks.forEach(chunk => {
			chunk.blocks.forEach((b: Block, listKey: string) => {
				if (!this.blockMeshes.has(listKey)) return;
				const blockMesh = this.blockMeshes.get(listKey)!;
				blockMesh.position.x = b.coords.x;
				blockMesh.position.y = b.coords.y;
				blockMesh.position.z = b.coords.z;
			});

			this.blockMeshes.forEach((bm: Mesh, listKey: string) => {
				if (!chunk.blocks.has(listKey)) {
					removeItemFromArray(this.scene.children, this.blockMeshes.get(listKey));
					this.blockMeshes.delete(listKey);
				}
			});
		});
	}

	public toJson(): IWorldData {
		const jsonObj: IWorldData = {
			blocks: [],
		};

		jsonObj.skyColor = {
			red: this.skyColor.r,
			green: this.skyColor.g,
			blue: this.skyColor.b,
		};

		this.chunks.forEach(chunk => chunk.blocks.forEach((b: Block, key: string) => jsonObj.blocks.push(b.toJson())));
		return jsonObj;
	}

	public toJsonString(): string {
		return JSON.stringify(this.toJson());
	}
}