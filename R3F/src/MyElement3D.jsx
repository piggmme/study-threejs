import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export default function MyElement3D() {
  const refMesh = useRef()
  useFrame((state, delta) => {
    // 매 프레임이 렌더 되기 전에 호출되는 함수
    refMesh.current.rotation.y += delta
  })

  return (
    <>
      <directionalLight position={[1,1,1]} />

      <mesh ref={refMesh} rotation={[0, 45*Math.PI/180, 0]}>
        <boxGeometry />
        <meshStandardMaterial color='#e67e22'/>
      </mesh>
    </>
  )
}