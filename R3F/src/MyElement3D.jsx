import { OrbitControls } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import {useControls} from 'leva'


export default function MyElement3D() {
  const refMesh = useRef()
  const refWireMesh = useRef()

  const {radius,widthSegments,heightSegments,phiStart,phiLength,thetaStart,thetaLength} = useControls({
    radius: {value: 1, min: 0.1, max: 5, step: 0.01},
    widthSegments: {value: 32, min: 3, max: 256, step: 1},
    heightSegments: {value: 32, min: 2, max: 256, step: 1},
    phiStart: {value: 0, min: 0, max: 2*Math.PI, step: 0.01},
    phiLength: {value: 2*Math.PI, min: 0, max: 2*Math.PI, step: 0.01},
    thetaStart: {value: 0, min: 0, max: Math.PI, step: 0.01},
    thetaLength: {value: Math.PI, min: 0, max: Math.PI, step: 0.01},
  })

  useEffect(()=> {
    refWireMesh.current.geometry = refMesh.current.geometry
  }, [radius,widthSegments,heightSegments,phiStart,phiLength])

  return (
    <>
      <directionalLight position={[1,1,1]} />
      <ambientLight intensity={0.1} />

      <axesHelper scale={10} /> {/* world 좌표계 */}
      <OrbitControls />

      <mesh ref={refMesh}>
        <sphereGeometry 
          args={[
            radius, widthSegments, heightSegments, 
            phiStart, phiLength,
            thetaStart, thetaLength
          ]}
        />
        <meshStandardMaterial color='#1abc9c'/>
      </mesh>

      <mesh ref={refWireMesh}>
        <meshStandardMaterial emissive="yellow" wireframe={true} />
      </mesh>
    </>
  )
} 