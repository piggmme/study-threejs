import { OrbitControls, Box } from '@react-three/drei'

export default function MyElement3D() {
  // Drei: R3F에서 사용할 수 있는 유용한 컴포넌트들을 제공하는 라이브러리
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

      <Box position={[-1.2, 0, 0]} >
        <meshStandardMaterial color='#8244ad'/>
      </Box>

    </>
  )
} 