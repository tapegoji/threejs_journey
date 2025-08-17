import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { createXRStore, XR, XROrigin, useXR } from '@react-three/xr'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'


const store = createXRStore()

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
        <button onClick={() => store.enterVR()}>Enter VR</button>
        <button onClick={() => store.enterAR()}>Enter AR</button>
        <Canvas>
        <XR store={store}>
            <XROrigin position={[1, 1, 1]}/>
                {/* <LeftStickLocomotion speed={2} /> */}
            <directionalLight position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
            <ambientLight intensity={ 1.5 } />

            <mesh position-x={ - 2 }>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
            </mesh>

            <mesh position-x={ 2 } scale={ 1.5 }>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>

            <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" />
            </mesh>
                {/* OrbitControls only outside XR; disable damping to avoid conflict */}
                {/* <OrbitControls enableDamping={false} makeDefault /> */}
        </XR>
        </Canvas>
    </>
)