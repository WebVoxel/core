import { Point3D } from '../util/Point3D';
import { Identifier } from '../Identifier';
import { IBlockData } from './IBlockData';
export declare class Block {
    coords: Point3D;
    type: Identifier;
    constructor(data?: IBlockData);
}
