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

  // 만화같은 재질을 위한 텍스쳐
  const texture = useTexture('./images/fiveTone.jpg')
  texture.minFilter = THREE.NearestFilter
  texture.magFilter = THREE.NearestFilter

  return (
    <>
      <OrbitControls />

      <directionalLight position={[0,1,0]} />
      <directionalLight position={[1,2,8]} intensity={0.7} />
      <ambientLight intensity={0.2} />

      <axesHelper scale={10} /> {/* world 좌표계 */}

      <mesh ref={mesh1} position={[0.7,0,0]}>
        <torusKnotGeometry args={[0.5,0.15,256,128]} /> 
        <meshToonMaterial gradientMap={texture} color="cyan" /> 
        {/* 
          https://threejs.org/docs/?q=toon#api/en/materials/MeshToonMaterial
          만화같은 재질
        */}
      </mesh>

      <mesh ref={mesh2} position={[-0.7,0,0]}>
        <torusGeometry args={[0.5,0.2]} /> 
      </mesh>
    </>
  )
} 