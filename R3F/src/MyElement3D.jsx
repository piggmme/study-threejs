import { OrbitControls } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function MyElement3D() {
  const mesh1 = useRef()
  const mesh2 = useRef()

  useEffect(()=>{
    mesh2.current.material = mesh1.current.material
  })

  return (
    <>
      <OrbitControls />

      <directionalLight position={[0,1,0]} />
      <directionalLight position={[1,2,8]} intensity={0.7} />
      <ambientLight intensity={0.2} />

      <axesHelper scale={10} /> {/* world 좌표계 */}

      <mesh ref={mesh1} position={[0.7,0,0]}>
        <boxGeometry /> 
        <meshBasicMaterial 
          visible={true}

          transparent={true}
          opacity={0.5}

          // depth buffer 
          depthTest={true} 
          depthWrite={true}

          // rendering 
          side={THREE.FrontSide} // 앞면만
          // side={THREE.BackSide} // 뒷면만
          // side={THREE.DoubleSide} // 양면

          wireframe={false}

          color="yellow"
        />
      </mesh>

      <mesh ref={mesh2} position={[-0.7,0,0]}>
        <torusGeometry args={[0.5,0.2]} /> 
      </mesh>
    </>
  )
} 