import { OrbitControls } from '@react-three/drei'

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
    </>
  )
} 