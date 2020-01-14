import { Point3D } from '../util/Point3D';
import { Identifier } from '../Identifier';
import { IBlockData } from './IBlockData';

export class Block {
	public coords: Point3D;
	public type: Identifier;

	constructor(data?: IBlockData) {
		this.coords = data ? new Point3D(data.x, data.y, data.z) : Point3D.ORIGIN;
		this.type = data ? Identifier.fromString(data.type) : Identifier.EMPTY;
	}
}