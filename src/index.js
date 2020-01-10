import './styles/index.scss';

import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('root').appendChild(renderer.domElement);

const geo_box_1 = new BoxGeometry(1, 1, 1);
const mat_box_1 = new MeshBasicMaterial({
    color: 0xdc3545,
});
const box_1 = new Mesh(geo_box_1, mat_box_1);

scene.add(box_1);
camera.position.z = 5;

const animate = function() {
    requestAnimationFrame(animate);

    box_1.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();