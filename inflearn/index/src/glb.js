import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function init() {
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
  scene.background = new THREE.Color("#a2d2ff");

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(2.4, 2, 4.7);
  // camera.lookAt(new THREE.Vector3(0, 6, 0));
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight("white", 3);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight("white", 1);
  directionalLight.castShadow = true; // 그림자를 만들 수 있는 빛
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add(directionalLight);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);

  // gltf loader
  const gltfLoader = new GLTFLoader();
  let mixer;

  gltfLoader.load("/models/bird.glb", (gltf) => {
    // shadow
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const meshs = gltf.scene.children;
    const bird = new THREE.Group();

    for (let i = meshs.length; i >= 0; i--) {
      bird.add(meshs[i]);
    }

    bird.position.set(-1, 1, 0);
    bird.castShadow = true;
    scene.add(bird);
  });

  gltfLoader.load("/models/miffy2.glb", (gltf) => {
    // shadow
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const meshs = gltf.scene.children;
    const miffy = new THREE.Group();

    for (let i = meshs.length; i >= 0; i--) {
      miffy.add(meshs[i]);
    }

    miffy.position.set(3, 0, 0);
    miffy.castShadow = true;
    scene.add(miffy);
  });

  gltfLoader.load("/models/pufgirl.glb", (gltf) => {
    // shadow
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const meshs = gltf.scene.children;
    const pufgirl = new THREE.Group();

    for (let i = meshs.length; i >= 0; i--) {
      pufgirl.add(meshs[i]);
    }

    pufgirl.position.set(1, 0, 0);
    pufgirl.castShadow = true;
    scene.add(pufgirl);
  });

  // Mesh
  // 바닥
  const planeGeometry = new THREE.PlaneGeometry(100, 100);
  const planeMaterial = new THREE.MeshStandardMaterial({
    color: "#d5bdaf",
    side: THREE.DoubleSide,
  });
  const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
  planeMesh.rotation.x = Math.PI * -0.5;
  planeMesh.receiveShadow = true;
  scene.add(planeMesh);

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();

    mixer?.update(delta);
    camera.lookAt(new THREE.Vector3(1.5, 1, 0));

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener("resize", setSize);

  draw();
}
