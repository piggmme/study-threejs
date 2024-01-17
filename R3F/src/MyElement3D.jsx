import { OrbitControls, MeshReflectorMaterial } from '@react-three/drei'
import {useControls} from 'leva'
import { degToRad } from 'three/src/math/MathUtils'

export default function MyElement3D() {
  const {rotateX, rotateY, rotateZ} = useControls({
    rotateX: { value: -90, min: -180, max: 180, step: 45 },
    rotateY: { value: 0, min: -180, max: 180, step: 45 },
    rotateZ: { value: 0, min: -180, max: 180, step: 45 },
  })

  return (
    <>
      <OrbitControls />

      <directionalLight position={[0,1,0]} />
      <directionalLight position={[1,2,8]} intensity={0.7} />
      <ambientLight intensity={0.2} />

      <axesHelper scale={10} /> {/* world 좌표계 */}

      <mesh position={[0,-0.6,0]} rotation={[degToRad(rotateX), degToRad(rotateY), degToRad(rotateZ)]}>
        <planeGeometry args={[10,10]} />
        <MeshReflectorMaterial
          // https://github.com/pmndrs/drei?tab=readme-ov-file#meshreflectormaterial
          // 모든 메시에 반사 및/또는 블러를 쉽게 추가할 수 있습니다. 보다 사실적인 효과를 위해 표면 거칠기를 고려합니다. 이 머티리얼은 THREE.MeshStandardMaterial에서 확장되며 모든 소품을 수용합니다.
          blur={[300,100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={30}
          roughness={1}
          depthScale={0.7}
          mixDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
        />
      </mesh>

      <mesh position={[0,0,0]}>
        <boxGeometry />
        <meshStandardMaterial color="cyan" />
      </mesh>
    </>
  )
} 