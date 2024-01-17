import './App.css'
import {Canvas} from '@react-three/fiber'
import MyElement3D from './MyElement3D'

function App() {
  return (
    <>
      <Canvas camera={{ near: 3.5, far: 6 }}>
        <MyElement3D />
      </Canvas>
    </>
  )
}

export default App
