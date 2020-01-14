import { Point3D } from '../util/Point3D';
import { Identifier } from '../Identifier';
import { IBlockData } from './IBlockData';
/**
 * A block.
 * @author RailRunner16
 */
export declare class Block {
    /**
     * The coordinates of this block.
     */
    coords: Point3D;
    /**
     * The type of this block.
     */
    type: Identifier;
    /**
     * Create a new block object.
     * @param {IBlockData} data The block data to initialize the block with. If not passed, defaults will be set.
     */
    constructor(data?: IBlockData);
}
