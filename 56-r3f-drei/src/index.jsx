import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { createXRStore, XR, XROrigin, useXR, useXRInputSourceState } from '@react-three/xr'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useRef } from 'react'

function JoystickLocomotion({ children, speed = 2, ...props }) {
    const ref = useRef()
    const controller = useXRInputSourceState('controller', 'left')
    const { camera } = useThree()
    
    useFrame((_, delta) => {
        if (ref.current == null || controller == null) {
            return
        }
        
        const thumbstickState = controller.gamepad['xr-standard-thumbstick']
        const triggerState = controller.gamepad['xr-standard-trigger']
        const squeezeState = controller.gamepad['xr-standard-squeeze']
        
        if (thumbstickState == null) {
            return
        }
        
        // Get thumbstick input for X and Z movement
        const xInput = thumbstickState.xAxis ?? 0
        const zInput = thumbstickState.yAxis ?? 0
        
        // Get Y-axis input from trigger (up) and squeeze (down) buttons
        let yInput = 0
        if (triggerState?.state === 'pressed') {
            yInput += 1 // Move up when trigger is pressed
        }
        if (squeezeState?.state === 'pressed') {
            yInput -= 1 // Move down when squeeze is pressed
        }
        
        // Calculate movement direction based on camera orientation
        const forward = new THREE.Vector3()
        const right = new THREE.Vector3()
        
        // Get camera's forward direction (negative Z in camera space)
        camera.getWorldDirection(forward)
        forward.y = 0 // Keep movement horizontal
        forward.normalize()
        
        // Get camera's right direction (cross product of up and forward)
        right.crossVectors(forward, new THREE.Vector3(0, 1, 0))
        right.normalize()
        
        // Apply movement based on camera orientation
        const movement = new THREE.Vector3()
        movement.addScaledVector(right, xInput * speed * delta) // Left/right movement
        movement.addScaledVector(forward, -zInput * speed * delta) // Forward/backward movement (negated)
        movement.y = yInput * speed * delta // Vertical movement
        
        // Apply the calculated movement
        ref.current.position.add(movement)
    })
    
    return (
        <XROrigin ref={ref} {...props}>
            {children}
        </XROrigin>
    )
}

const store = createXRStore()

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
        <button onClick={() => store.enterVR()}>Enter VR</button>
        <button onClick={() => store.enterAR()}>Enter AR</button>
        <Canvas>
        <XR store={store}>
            <JoystickLocomotion position={[1, 1, 1]} speed={2} />
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