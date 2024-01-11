import { OrbitControls } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import {useControls} from 'leva'


export default function MyElement3D() {
  const refMesh = useRef()
  const refWireMesh = useRef()

  const {xSize,ySize,zSize,xSegments,ySegments,zSegments} = useControls({
    xSize: {value: 1, min: 0.1, max: 5, step: 0.01},
    ySize: {value: 1, min: 0.1, max: 5, step: 0.01},
    zSize: {value: 1, min: 0.1, max: 5, step: 0.01},
    xSegments: {value: 1, min: 1, max: 10, step: 1},
    ySegments: {value: 1, min: 1, max: 10, step: 1},
    zSegments: {value: 1, min: 1, max: 10, step: 1},
  })

  useEffect(()=> {
    refWireMesh.current.geometry = refMesh.current.geometry
  }, [xSize,ySize,zSize,xSegments,ySegments,zSegments])

  return (
    <>
      <directionalLight position={[1,1,1]} />
      <ambientLight intensity={0.1} />

      <axesHelper scale={10} /> {/* world 좌표계 */}
      <OrbitControls />

      <mesh ref={refMesh}>
        <boxGeometry args={[xSize,ySize,zSize,xSegments,ySegments,zSegments]} />
        <meshStandardMaterial color='#1abc9c'/>
      </mesh>

      <mesh ref={refWireMesh}>
        <meshStandardMaterial emissive="yellow" wireframe={true} />
      </mesh>
    </>
  )
} 