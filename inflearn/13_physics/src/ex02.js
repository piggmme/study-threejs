import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as CANNON from "cannon-es";

// ----- 주제: Contact Material

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

  // ********************* Cannon (물리 엔진) *********************
  const cannonWorld = new CANNON.World();
  cannonWorld.gravity.set(0, -9.82, 0); // 중력

  // ****** Contact Material ******
  const defaultMaterial = new CANNON.Material("default");
  const rubberMaterial = new CANNON.Material("rubber"); // 고무
  const ironMaterial = new CANNON.Material("iron"); // 철

  const defaultContactMaterial = new CANNON.ContactMaterial(
    // 기본 재질 끼리 부딪히는 경우
    defaultMaterial,
    defaultMaterial,
    {
      friction: 0.5, // 마찰력
      restitution: 0.3, // 반발력
    }
  );
  cannonWorld.defaultContactMaterial = defaultContactMaterial;

  const rubberContactMaterial = new CANNON.ContactMaterial(
    // 고무와 기본 재질 끼리 부딪히는 경우
    rubberMaterial,
    defaultMaterial,
    {
      friction: 0.5,
      restitution: 0.7, // 반발력을 높여서 튕기는 정도를 높임
    }
  );
  cannonWorld.addContactMaterial(rubberContactMaterial);

  const ironContactMaterial = new CANNON.ContactMaterial(
    // 철과 기본 재질 끼리 부딪히는 경우
    ironMaterial,
    defaultMaterial,
    {
      friction: 0.5,
      restitution: 0,
    }
  );
  cannonWorld.addContactMaterial(ironContactMaterial);

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

  // 공 body
  const sphereShape = new CANNON.Sphere(0.5); // 반지름 0.5
  const sphereBody = new CANNON.Body({
    mass: 1, // 질량
    position: new CANNON.Vec3(0, 10, 0), // 위치
    shape: sphereShape,
    material: rubberMaterial,
  });
  cannonWorld.addBody(sphereBody);

  // ********************* Mesh *********************

  // 바닥
  const floorMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
      color: "slategray",
    })
  );
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.receiveShadow = true;
  scene.add(floorMesh);

  // 박스
  const sphereGeometry = new THREE.SphereGeometry(0.5);
  const sphereMaterial = new THREE.MeshStandardMaterial({
    color: "seagreen",
  });
  const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphereMesh.position.y = 0.5;
  sphereMesh.castShadow = true;
  scene.add(sphereMesh);

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();

    // 물리 엔진 업데이트
    let cannonStepTime = 1 / 60;
    if (delta < 0.01) cannonStepTime = 1 / 120;
    cannonWorld.step(cannonStepTime, delta, 3); // 주사율, delta, 간격 보정 횟수

    // 매쉬와 바디의 위치 동기화
    sphereMesh.position.copy(sphereBody.position); // 위치
    sphereMesh.quaternion.copy(sphereBody.quaternion); // 회전

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
