import { OrbitControls, Box } from '@react-three/drei'
import * as THREE from 'three'

function MyBox(props){
  const geom = new THREE.BoxGeometry()
  return (
    <mesh {...props} geometry={geom}>
    </mesh>
  )
}

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

      <Box position={[-1.2, 0, 0]} >
        <meshStandardMaterial color='#8244ad'/>
      </Box>

      <MyBox position={[1.2, 0, 0]}> 
        <meshStandardMaterial color='#3498db'/>
      </MyBox>
    </>
  )
} 