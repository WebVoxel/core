export class Point3D {
	public static ORIGIN: Point3D = new Point3D(0, 0, 0);

	public x: number;
	public y: number;
	public z: number;

	constructor(x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
}