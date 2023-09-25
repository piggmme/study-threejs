import * as THREE from "three";

// ----- 주제: 애니메이션 성능 보정

export default function example() {
  const canvas = document.getElementById("three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("blue");

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.z = 5;
  scene.add(camera);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 0, 2);
  scene.add(light);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: "red" });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer.render(scene, camera);

  // 성능 보정
  // 어떤 성능의 컴퓨터에서든 시간은 동일하다.
  // 시간을 기준으로 애니메이션 값을 설정하면 어떤 컴퓨터에서든 동일한 애니메이션을 볼 수 있다.
  const clock = new THREE.Clock();

  function draw() {
    // const time = clock.getElapsedTime();
    const delta = clock.getDelta(); // 이전 time과 시간 차

    mesh.rotation.y += delta * 2;
    mesh.position.y += delta;
    if (mesh.position.y > 3) {
      mesh.position.y = 0;
    }
    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }
  window.addEventListener("resize", onWindowResize);
  draw();
}
