import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { PreventDragClick } from "./PreventDragClick.js";

// ----- 주제: 클릭한 매쉬 선택하기

export default function example() {
  // Renderer
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.x = 5;
  camera.position.y = 1.5;
  camera.position.z = 4;
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight("white", 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight("white", 1);
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add(directionalLight);

  // Controls
  const coltrols = new OrbitControls(camera, renderer.domElement);

  // Mesh

  // 박스
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const boxMaterial = new THREE.MeshStandardMaterial({
    color: "plum",
  });
  const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  boxMesh.name = "box";

  // 도넛
  const torusGeometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
  const torusMaterial = new THREE.MeshStandardMaterial({
    color: "lime",
  });
  const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
  torusMesh.name = "torus";

  scene.add(boxMesh, torusMesh);

  const meshes = [boxMesh, torusMesh];

  // Raycaster
  const raycaster = new THREE.Raycaster();

  // 마우스
  const mouse = new THREE.Vector2();

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const elapsedTime = clock.getElapsedTime();

    boxMesh.material.color.set("plum");
    torusMesh.material.color.set("lime");

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  function checkIntersects() {
    if (preventDragClick.mouseMoved) return;

    raycaster.setFromCamera(mouse, camera); // 카메라 시점에서 관선을 쏨

    const intersects = raycaster.intersectObjects(meshes); // 관선이 매쉬와 교차하는지 확인
    for (const item of intersects) {
      console.log(item.object.name);
    }

    if (intersects.length) {
      console.log(intersects[0].object.name); // 첫번째 선택된 매쉬의 이름
    }
  }

  // 이벤트
  window.addEventListener("resize", setSize);
  window.addEventListener("click", (e) => {
    console.log(e.clientX, e.clientY);
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1; // 가운데가 0인 -1 ~ 1 사이의 값
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    checkIntersects();
  });

  // 드래그 클릭 방지
  const preventDragClick = new PreventDragClick(canvas);

  draw();
}
