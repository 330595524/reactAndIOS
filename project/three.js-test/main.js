let THREE = require('three');
// let THREE = require('three');

// fov = camera.toJSON().object.fov;
// aspect = camera.toJSON().object.aspect
// near = camera.toJSON().object.near;
// far = camera.toJSON().object.far;
// var _camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

matrix = [-0.37261396646499634, -1.9945733953363742e-9, -0.9279863834381104, 0, 0.3370102047920227, 0.9317256808280945, -0.1353195756673813, 0, 0.8646287322044373, -0.3631628751754761, -0.3471740186214447, 0, 275.2582702636719, -225.53369140625, -121.93583679199219, 1]
// var width = 975, height = 969;

// matrix = camera.toJSON().object.matrix;
// matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
// var width = window.innerWidth, height = window.innerHeight;
let width = 1000;
let height = 1000
var widthHalf = width / 2, heightHalf = height / 2;
var _camera = new THREE.PerspectiveCamera();

// _camera.matrixWorld.set(matrix[0], matrix[1],matrix[2],matrix[3],
                    // matrix[4],matrix[5],matrix[6],matrix[7],
                    // matrix[8],matrix[9],matrix[10],matrix[11],
                    // matrix[12],matrix[13],matrix[14],matrix[15]);
_camera.matrixWorld.set(matrix[0], matrix[4],matrix[8],matrix[12],
                    matrix[1],matrix[5],matrix[9],matrix[13],
                    matrix[2],matrix[6],matrix[10],matrix[14],
                    matrix[3],matrix[7],matrix[11],matrix[15]);
// _camera.updateProjectionMatrix();
// _camera.updateMatrixWorld()

console.log(_camera)
var pos = new THREE.Vector3(0, 0, 0)
pos.project(_camera);
pos.x = ( pos.x * widthHalf ) + widthHalf;
pos.y = - ( pos.y * heightHalf ) + heightHalf;
console.log(pos)