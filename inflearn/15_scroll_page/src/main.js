import * as THREE from "three";
import { House } from "./House";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

// ----- 주제: 스크롤에 따라 움직이는 3D 페이지

// Renderer
const canvas = document.querySelector("#three-canvas");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("white");

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(-5, 2, 25);
scene.add(camera);

// Light
const ambientLight = new THREE.AmbientLight("white", 1);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight("white", 100000, 300);
spotLight.position.set(0, 150, 100);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 200;
scene.add(spotLight);

// Mesh
const floorMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({ color: "white" })
);
floorMesh.rotation.x = -Math.PI / 2;
floorMesh.receiveShadow = true;
scene.add(floorMesh);

const gltfLoader = new GLTFLoader();

const houses = [];
houses.push(
  new House({
    x: -5,
    z: 20,
    modelSrc: "/models/house.glb",
    gltfLoader,
    scene,
  })
);
houses.push(
  new House({
    x: 7,
    z: 10,
    modelSrc: "/models/house.glb",
    gltfLoader,
    scene,
  })
);
houses.push(
  new House({
    x: -10,
    z: 0,
    modelSrc: "/models/house.glb",
    gltfLoader,
    scene,
  })
);
houses.push(
  new House({
    x: 10,
    z: -10,
    modelSrc: "/models/house.glb",
    gltfLoader,
    scene,
  })
);
houses.push(
  new House({
    x: 5,
    z: 0,
    modelSrc: "/models/house.glb",
    gltfLoader,
    scene,
  })
);
// 그리기
const clock = new THREE.Clock();

function draw() {
  const delta = clock.getDelta();

  renderer.render(scene, camera);
  renderer.setAnimationLoop(draw);
}

let currentSection = 0;

function setSection() {
  const $sections = document.querySelector(".sections");
  const idx = Math.round($sections.scrollTop / window.innerHeight);

  if (idx === currentSection) return;

  currentSection = idx;
  gsap.to(camera.position, {
    duration: 1,
    x: houses[currentSection].x,
    z: houses[currentSection].z + 5,
  });
}

function setSize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}

// 이벤트
document.querySelector(".sections").addEventListener("scroll", setSection);
window.addEventListener("resize", setSize);

draw();
