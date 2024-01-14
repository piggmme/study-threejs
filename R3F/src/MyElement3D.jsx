import { OrbitControls } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import {useControls} from 'leva'


export default function MyElement3D() {
  const refMesh = useRef()
  const refWireMesh = useRef()

  const {topRadius,bottomRadius,height,radialSegments,heightSegments,bOpen,thetaStart,thetaLength} = useControls({
    topRadius: {value: 1, min: 0.1, max: 5, step: 0.01},
    bottomRadius: {value: 1, min: 0.1, max: 5, step: 0.01},
    height: {value: 1, min: 0.1, max: 5, step: 0.01},
    radialSegments: {value: 32, min: 3, max: 256, step: 1},
    heightSegments: {value: 1, min: 1, max: 256, step: 1},
    bOpen: {value: false},
    thetaStart: {value: 0, min: 0, max: 2*Math.PI, step: 0.01},
    thetaLength: {value: 2*Math.PI, min: 0, max: 2*Math.PI, step: 0.01},
  })

  useEffect(()=> {
    refWireMesh.current.geometry = refMesh.current.geometry
  }, [topRadius,bottomRadius,height,radialSegments,heightSegments,bOpen,thetaStart,thetaLength])

  return (
    <>
      <directionalLight position={[1,1,1]} />
      <ambientLight intensity={0.1} />

      <axesHelper scale={10} /> {/* world 좌표계 */}
      <OrbitControls />

      <mesh ref={refMesh}>
        <cylinderGeometry 
          args={[
            topRadius,bottomRadius,height,
            radialSegments,heightSegments,
            bOpen,
            thetaStart,thetaLength
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