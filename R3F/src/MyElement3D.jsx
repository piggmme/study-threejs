import { OrbitControls, Box } from '@react-three/drei'
import * as THREE from 'three'


export default function MyElement3D() {
  return (
    <>
      <directionalLight position={[1,1,1]} />
      <ambientLight intensity={0.1} />

      <axesHelper scale={10} /> {/* world 좌표계 */}
      <OrbitControls />

      <mesh>
        <boxGeometry />
        <meshStandardMaterial color='#1abc9c'/>
      </mesh>

      <mesh>
        <boxGeometry />
        <meshStandardMaterial emissive="yellow" wireframe={true} />
      </mesh>
    </>
  )
} 