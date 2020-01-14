import { Point3D } from '../util/Point3D';
import { Identifier } from '../Identifier';
import { IBlockData } from './IBlockData';

/**
 * A block.
 * @author RailRunner16
 */
export class Block {
	/**
	 * The coordinates of this block.
	 */
	public coords: Point3D;

	/**
	 * The type of this block.
	 */
	public type: Identifier;

	/**
	 * Create a new block object.
	 * @param {IBlockData} data The block data to initialize the block with. If not passed, defaults will be set.
	 */
	constructor(data?: IBlockData) {
		this.coords = data ? new Point3D(data.x, data.y, data.z) : Point3D.ORIGIN;
		this.type = data ? Identifier.fromString(data.type) : Identifier.EMPTY;
	}
}