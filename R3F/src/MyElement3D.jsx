import { OrbitControls } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import {useControls} from 'leva'
import * as THREE from 'three'

export default function MyElement3D() {
  const mesh1 = useRef()
  const mesh2 = useRef()

  const {roughness,metalness,clearcoat,clearcoatRoughness,transmission,thickness,ior} =useControls({
    roughness: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.01,
    },
    metalness: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.01,
    },
    clearcoat: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.01,
    },
    clearcoatRoughness: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.01,
    },
    transmission: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.01,
    },
    thickness: {
      value: 0,
      min: 0,
      max: 10,
      step: 0.01,
    },
    ior: {
      value: 1.5,
      min: 0,
      max: 2.333,
      step: 0.01,
    },
  })

  useEffect(()=>{
    mesh2.current.material = mesh1.current.material
  }, [roughness,metalness,clearcoat,clearcoatRoughness,transmission,thickness,ior])

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
        <meshPhysicalMaterial 
          // meshStandardMaterial를 상속받음
          // https://threejs.org/docs/#api/en/materials/MeshPhysicalMaterial
          visible={true}

          transparent={true}
          opacity={1}

          // depth buffer 
          depthTest={true} 
          depthWrite={true}

          // rendering 
          // side={THREE.FrontSide} // 앞면만
          // side={THREE.BackSide} // 뒷면만
          side={THREE.DoubleSide} // 양면

          wireframe={false}

          color="#ffffff"
          emissive="#000000" // 매쉬가 내는 빛. 기본값은 블랙
          
          roughness={roughness} // 거칠기
          metalness={metalness} // 금속감
          
          clearcoat={clearcoat} // 코팅
          clearcoatRoughness={clearcoatRoughness}
          
          flatShading={false} // 평면 쉐이딩. 기본값은 false

          // 유리 관련 속성값
          transmission={transmission} // 투명도. 기본값은 0
          thickness={thickness} // 유리의 두께
          ior={ior} // 굴절률
        />
      </mesh>

      <mesh ref={mesh2} position={[-0.7,0,0]}>
        <torusGeometry args={[0.5,0.2]} /> 
      </mesh>
    </>
  )
} 