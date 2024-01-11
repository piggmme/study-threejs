import { useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export default function MyElement3D() {
  const refMesh = useRef()

  useFrame((_, delta) => {
    refMesh.current.rotation.y += delta
  })
  
  return (
    <>
      <directionalLight position={[1,1,1]} />

      <axesHelper scale={10} /> {/* world 좌표계 */}
      <OrbitControls />

      <mesh 
        ref={refMesh} 
        position={[0,2,0]} 
        rotation={[0, 0, THREE.MathUtils.degToRad(45)]} 
        scale={[2,1,1]}
      >
        <boxGeometry />
        <meshStandardMaterial 
          color='#e67e22' 
          opacity={0.5} 
          transparent={true} 
        />
        <axesHelper /> 

        <mesh
          scale={0.1}
          position-y={2}
        >
            <sphereGeometry />
            <meshStandardMaterial color='red' />
            <axesHelper scale={5} /> 
        </mesh>
      </mesh>
        
    </>
  )
} 