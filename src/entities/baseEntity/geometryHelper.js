import { BufferGeometry, Vector3, Quaternion, Matrix4 } from 'three';

/**
 * @class GeometryHelper
 * @classdesc Geometry management helper class
 */
export class GeometryHelper {

	constructor() {
		this.xAxis = new Vector3( 1, 0, 0 );
		this.yAxis = new Vector3( 0, 1, 0 );
		this.zAxis = new Vector3( 0, 0, 1 );
	}

	
	/**
	 * Returns an index array for a line.
	 * @param points {Array} vertex array to create an index.
     * @return {Array} index array
	*/
	generatePointIndex( points ) {
		let index = [];
        
		for ( let i = 1; i < points.length; i++ ) {
			index.push( i - 1 );
			index.push( i );
		}

		return index;
	}

	/**
	 * Prepares given THREE.Line object to draw dashed lines, changing to a non indexed geometry & computing line distances.
	 * @param line {THREE.Line} THREE.Line object to prepare for dashed lines.
	*/
	fixMeshToDrawDashedLines( line ) {
		if( line.geometry.index ) line.geometry = line.geometry.toNonIndexed();
		line.computeLineDistances();
	}

	/**
   * 
   * @param {BufferGeometry} geometry 
   */
	offsetByBoundingBox( geometry ) {
		geometry.computeBoundingBox();
		const boundingBox = geometry.boundingBox;

		const center = new Vector3();
		boundingBox.getCenter( center );

		// Translate geometry by the negative center
		geometry.translate( -center.x, -center.y, -center.z );

		// If you're dealing with large numbers, you can optionally scale the geometry to normalize it as well:
		const size = boundingBox.getSize( new Vector3() ); // Get the size of the bounding box
		const maxSize = Math.max( size.x, size.y, size.z ); // Find the largest dimension
		geometry.scale( 1 / maxSize, 1 / maxSize, 1 / maxSize ); // Normalize if needed
		geometry.computeBoundingBox();

		return { position: center, scale: new Vector3( 1, 1, 1 ).multiplyScalar( maxSize ) };
	}
}