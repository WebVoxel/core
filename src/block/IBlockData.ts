import { Identifier } from '../Identifier';

/**
 * Raw block data. Used when instantiating a block or importing block data.
 * @author RailRunner16
 */
export interface IBlockData {
    /**
     * The type of block stored in this piece of block data
     */
    type: string | Identifier;
    coords?: {
	    x: number;
	    y: number;
        z: number;
    };
}
