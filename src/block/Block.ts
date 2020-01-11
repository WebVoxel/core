import { Point3D } from '../util/Point3D';

export class Block {
	public coords: Point3D;

	constructor(coords: Point3D) {
		this.coords = coords;
	}
}