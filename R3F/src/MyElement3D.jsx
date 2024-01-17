import { OrbitControls, useTexture } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import {useControls} from 'leva'
import * as THREE from 'three'

export default function MyElement3D() {
  const mesh1 = useRef()
  const mesh2 = useRef()

  useEffect(()=>{
    mesh2.current.material = mesh1.current.material
  }, [])

  // matcap 이미지: https://github.com/emmelleppi/matcaps
  const matcap = useTexture('./images/matcap.png')

  return (
    <>
      <OrbitControls />

      {/* <directionalLight position={[0,1,0]} />
      <directionalLight position={[1,2,8]} intensity={0.7} />
      <ambientLight intensity={0.2} /> */}

      <axesHelper scale={10} /> {/* world 좌표계 */}

      <mesh ref={mesh1} position={[0.7,0,0]}>
        <torusKnotGeometry args={[0.5,0.15,256,128]} /> 
        <meshMatcapMaterial matcap={matcap} /> 
        {/* 
          https://threejs.org/docs/?q=meshmat#api/en/materials/MeshMatcapMaterial
          광원이 없어도 물질에 상이 표현되는 재질
          MeshMatcapMaterial is defined by a MatCap (or Lit Sphere) texture, which encodes the material color and shading.
          번역: MatCap(또는 Lit Sphere) 텍스처에 의해 정의되는 MeshMatcapMaterial은 재질 색상과 음영을 인코딩합니다.
        */}
      </mesh>

      <mesh ref={mesh2} position={[-0.7,0,0]}>
        <torusGeometry args={[0.5,0.2]} /> 
      </mesh>
    </>
  )
} 