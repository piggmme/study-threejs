import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as CANNON from "cannon-es";
import { PreventDragClick } from "./PreventDragClick";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Domino } from "./Domino";

// ----- 주제: 도미노

// cannon.js 문서
// http://schteppe.github.io/cannon.js/docs/
// 주의! https 아니고 http

export default function example() {
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

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.y = 1.5;
  camera.position.z = 4;
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight("white", 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight("white", 1);
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // Controls
  const coltrols = new OrbitControls(camera, renderer.domElement);

  // Loader
  const gltfLoader = new GLTFLoader();

  // ********************* Cannon (물리 엔진) *********************
  const cannonWorld = new CANNON.World();
  cannonWorld.gravity.set(0, -9.82, 0); // 중력

  // ****** Contact Material ******
  const defaultMaterial = new CANNON.Material("default");
  const defaultContactMaterial = new CANNON.ContactMaterial(
    // 기본 재질 끼리 부딪히는 경우
    defaultMaterial,
    defaultMaterial,
    {
      friction: 0.01, // 마찰력
      restitution: 0.9, // 반발력
    }
  );
  cannonWorld.defaultContactMaterial = defaultContactMaterial;

  // 성능을 위한 세팅
  // cannonWorld.allowSleep = true; // body가 느려지면 테스트 안함
  cannonWorld.broadphase = new CANNON.SAPBroadphase(cannonWorld); // 효율을 위한 설정

  // ****** body ******
  // 바닥 body
  const floorShape = new CANNON.Plane();
  const floorBody = new CANNON.Body({
    mass: 0, // 질량 0 -> 질량을 주면 낙하하기 때문에 0으로 설정
    position: new CANNON.Vec3(0, 0, 0), // 바닥의 위치
    shape: floorShape,
    material: defaultMaterial,
  });
  floorBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(-1, 0, 0), // 회전 축 (x축)
    Math.PI / 2 // 회전 각도
  ); // 바닥의 회전
  cannonWorld.addBody(floorBody);

  // ********************* Mesh *********************

  // 바닥
  const floorMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({
      color: "slategray",
    })
  );
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.receiveShadow = true;
  scene.add(floorMesh);

  // 공
  const sphereGeometry = new THREE.SphereGeometry(0.5);
  const sphereMaterial = new THREE.MeshStandardMaterial({
    color: "skyblue",
  });

  // 도미노
  const dominos = [];
  let domino;
  for (let i = 0; i < 20; i++) {
    domino = new Domino({
      scene,
      index: i,
      cannonWorld,
      gltfLoader,
      z: -i * 0.8,
    });
    dominos.push(domino);
  }

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();

    // 물리 엔진 업데이트
    let cannonStepTime = 1 / 60;
    if (delta < 0.01) cannonStepTime = 1 / 120;
    cannonWorld.step(cannonStepTime, delta, 3); // 주사율, delta, 간격 보정 횟수

    // 도미노 body 연결
    dominos.forEach((domino) => {
      if (!domino.cannonBody) return;
      domino.modelMesh.position.copy(domino.cannonBody.position);
      domino.modelMesh.quaternion.copy(domino.cannonBody.quaternion);
    });

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // Raycaster
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function checkIntersects() {
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);

    if (!intersects[0].object.cannonBody) return;
    intersects[0].object.cannonBody.applyForce(
      new CANNON.Vec3(0, 0, -100), // 힘의 방향과 크기
      new CANNON.Vec3(0, 0, 0) // 힘을 가할 위치
    );
  }

  // 이벤트
  window.addEventListener("resize", setSize);
  window.addEventListener("click", (e) => {
    if (preventDragClick.mouseMoved) return;
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    checkIntersects();
  });
  const preventDragClick = new PreventDragClick(canvas);

  draw();
}
