import * as THREE from "three";

// ----- 주제: 브라우저 창 사이즈 변경에 대응하기

export default function example() {
  // 1. 렌더러 세팅
  // 동적으로 캔버스 조립하기
  // const renderer = new THREE.WebGLRenderer();
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);

  // 정적으로 캔버스 조립하기
  const canvas = document.getElementById("three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true, // 계단 현상 제거
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 레티나 디스플레이에서도 잘 보이도록 설정
  console.log(window.devicePixelRatio); // 100px 짜리 이미지 폭을 표현할때 실제론 200px를 사용한다.
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // 2. 씬, 카메라 세팅
  const scene = new THREE.Scene();

  // 2-1. PerspectiveCamera(fov, aspect, near, far) -> 사람 눈으로 보는 느낌
  // const camera = new THREE.PerspectiveCamera(
  //   75, // 시야각 (FOV, Field of View)
  //   window.innerWidth / window.innerHeight, // 종횡비 (aspect ratio)
  //   0.1, // near
  //   1000 // far
  // );

  // 2-2. OrthographicCamera(left, right, top, bottom, near, far) -> 평면으로 보는 느낌, 롤 게임 같이 보임
  const camera = new THREE.OrthographicCamera(
    -(window.innerWidth / window.innerHeight), // left
    window.innerWidth / window.innerHeight, // right
    1, // top
    -1, // bottom
    0.1, // near
    1000 // far
  );

  // position 설정 안했다면 카메라 기본 위치 (0,0,0)
  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 5;

  camera.lookAt(0, 0, 0);
  camera.zoom = 0.5;
  camera.updateProjectionMatrix();

  scene.add(camera);

  // 3. Mesh 생성
  const geometry = new THREE.BoxGeometry(1, 1, 1); // 모양
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // 재질
  const mesh = new THREE.Mesh(geometry, material); // 메쉬 생성
  scene.add(mesh); // 씬에 메쉬 추가

  renderer.render(scene, camera); // 렌더링

  // 4. 이벤트 처리: 브라우저 창 사이즈 변경에 대응하기
  function onWindowResize() {
    // 카메라
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // 렌더러
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }
  window.addEventListener("resize", onWindowResize);
}
