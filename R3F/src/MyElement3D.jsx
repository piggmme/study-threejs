import { OrbitControls, Box } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'


export default function MyElement3D() {
  const refMesh = useRef()
  const refWireMesh = useRef()

  useEffect(()=> {
    refWireMesh.current.geometry = refMesh.current.geometry
  }, [])

  return (
    <>
      <directionalLight position={[1,1,1]} />
      <ambientLight intensity={0.1} />

      <axesHelper scale={10} /> {/* world 좌표계 */}
      <OrbitControls />

      <mesh ref={refMesh}>
        <boxGeometry />
        <meshStandardMaterial color='#1abc9c'/>
      </mesh>

      <mesh ref={refWireMesh}>
        <meshStandardMaterial emissive="yellow" wireframe={true} />
      </mesh>
    </>
  )
} 