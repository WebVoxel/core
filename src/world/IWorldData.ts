import { IBlockData } from "../block/IBlockData";

/**
 * Raw world data. Used when loading a world from JSON data.
 * @author RailRunner16
 */
export interface IWorldData {
    blocks: IBlockData[];
}