/**
 * A point in 3D space.
 * @author RailRunner16
 */
export class Point3D {
	public static ORIGIN: Point3D = new Point3D(0, 0, 0);

	public x: number;
	public y: number;
	public z: number;

	/**
	 * Create a new 3D point
	 * @param {number} x The X coordinate
	 * @param {number} y The Y coordinate
	 * @param {number} z The Z coordinate
	 */
	constructor(x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
}