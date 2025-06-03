import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Create scene
const scene = new THREE.Scene();
scene.background = null; // Transparent background

// Create camera
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

// Create renderer
const container = document.getElementById('iphone-model-container');
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Call resize immediately to fix initial perspective
onWindowResize();

// Create video texture
const video = document.createElement('video');
video.src = 'videos/demo.mp4';
video.loop = true;
video.muted = true;
video.playsInline = true;
// Make sure video is loaded before creating texture
video.addEventListener('loadeddata', () => {
    video.play();
});
const videoTexture = new THREE.VideoTexture(video);
videoTexture.colorSpace = THREE.SRGBColorSpace;
// videoTexture.minFilter = THREE.LinearFilter;
// videoTexture.magFilter = THREE.LinearFilter;
// videoTexture.format = THREE.RGBAFormat;

// Fix rotation and aspect ratio
videoTexture.rotation = Math.PI;
videoTexture.center = new THREE.Vector2(0.5, 0.5);
videoTexture.repeat.set(-2.1, 1);  // Make repeat.x negative to flip horizontally
videoTexture.offset.set(2.1 * 0.25, 0); // Adjust offset to compensate for negative repeat

// Add light
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 3.0);
scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
// directionalLight.position.set(5, 5, 5);
// scene.add(directionalLight);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = false;

// Load the model
const loader = new GLTFLoader();
loader.load(
    'models/iphone.glb',
    function (gltf) {
        const model = gltf.scene;
        scene.add(model);
        
        // Find the screen object and apply video texture
        model.traverse((node) => {
            if (node.name === 'screen') {
                if (node.material) {
                    // Reset material for better color reproduction
                    // node.material = new THREE.SpriteMaterial({ map: videoTexture, opacity: 100, transparent: false });

                    node.material = new THREE.MeshStandardMaterial({
                        map: videoTexture,
                        // emissive: new THREE.Color(0xffffff),
                        map: videoTexture,
                        // emissiveMap: videoTexture,
                        // emissiveIntensity: 1.0,
                        // transparent: false,
                        // opacity: 1.0,
                        flatShading: true,
                        metalness: 0,
                        roughness: 0,
                    });

                    // Update texture properties
                    node.material.map.rotation = videoTexture.rotation;
                    node.material.map.center = videoTexture.center;
                    node.material.map.repeat = videoTexture.repeat;
                    node.material.map.offset = videoTexture.offset;
                    // Apply same properties to emissive map
                    node.material.emissiveMap.rotation = videoTexture.rotation;
                    node.material.emissiveMap.center = videoTexture.center;
                    node.material.emissiveMap.repeat = videoTexture.repeat;
                    node.material.emissiveMap.offset = videoTexture.offset;
                }
            }
        });
        
        // Auto-rotate the model
        model.rotation.y = Math.PI / 4;
        
        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        
        // Scale the model appropriately
        const scale = 1;
        model.scale.set(scale, scale, scale);
    },
    undefined,
    function (error) {
        console.error('An error occurred loading the model:', error);
    }
);

// Handle window resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate(); 