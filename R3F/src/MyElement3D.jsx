import { OrbitControls } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import {useControls} from 'leva'
import * as THREE from 'three'

export default function MyElement3D() {
  const mesh1 = useRef()
  const mesh2 = useRef()

  useEffect(()=>{
    mesh2.current.material = mesh1.current.material
  }, [])

  // https://www.youtube.com/watch?v=pDsf-mrjBHo&list=PLe6NQuuFBu7HUeJkowKRkLWwkdOlhwrje&index=7
  return (
    <>
      <OrbitControls />

      <directionalLight position={[0,1,0]} />
      <directionalLight position={[1,2,8]} intensity={0.7} />
      <ambientLight intensity={0.2} />

      <axesHelper scale={10} /> {/* world 좌표계 */}

      <mesh ref={mesh1} position={[0.7,0,0]}>
        <torusKnotGeometry args={[0.5,0.15,256,128]} /> 
        <meshDepthMaterial /> 
        {/* 
          https://threejs.org/docs/#api/en/materials/MeshDepthMaterial
          camera의 near, far 속성을 변경시켜야 변화를 확인 가능.
          카메라로부터 거리가 가까운 것은 그 값을 0으로 할당하고,
          카메라로부터 거리가 멀어질수록 1에 가까운 값을 할당한다.
        */}
      </mesh>

      <mesh ref={mesh2} position={[-0.7,0,0]}>
        <torusGeometry args={[0.5,0.2]} /> 
      </mesh>
    </>
  )
} 