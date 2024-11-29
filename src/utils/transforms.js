import * as THREE from 'three';
/**
 * 
 * @param {THREE.Vector2[] | THREE.Vector3[]} points 
 */
export const offsetPoints = ( points ) => {
	if ( points[0].isVector3 ) {
		return offsetVec3Points( points );
	} else {
		return offsetVec2Points( points );
	}
};

/**
 * 
 * @param {THREE.Vector2[]} points 
 */
export const offsetVec2Points = ( points ) => {
	const bb = new THREE.Box2().setFromPoints( points );
	const center = bb.getCenter( new THREE.Vector2() );
  
	points.forEach( ( point ) => point.sub( center ) );
	return new THREE.Vector3( center.x, center.y, 0 );
};

/**
 * 
 * @param {THREE.Vector3[]} points 
 */
export const offsetVec3Points = ( points ) => {
	const bb = new THREE.Box3().setFromPoints( points );
	const center = bb.getCenter( new THREE.Vector3() );
  
	points.forEach( ( point ) => point.sub( center ) );
	return center;
};