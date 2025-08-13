'use client'
import { useRef } from "react"
import * as THREE from "three"
import { Canvas,
        extend,
        useThree,
        useFrame} from "@react-three/fiber"
import { GizmoHelper,
        GizmoViewport,
        // OrbitControls, 
        PivotControls} from "@react-three/drei"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

extend({ OrbitControls })

declare module '@react-three/fiber' {
  interface ThreeElements {
    orbitControls: any
  }
}

const Model = ({ name, meshRef }: { name: string, meshRef?: any }) => {
    const components = {
        SphereGeometry: <SphereGeometry meshRef={meshRef} />,
        BoxGeometry: <BoxGeometry meshRef={meshRef} />,
        PlaneGeometry: <PlaneGeometry meshRef={meshRef} />
    };
    return (
        <>
        {/* <PivotControls anchor={[1, 1, 1]}> */}
            {components[name as keyof typeof components] || null}
        {/* </PivotControls> */}
        </>
    );
}

const SphereGeometry = ({ meshRef }: { meshRef?: any }) => (
    <mesh ref={meshRef} scale={1.0} position-x={-2}>
        <sphereGeometry />
        <meshBasicMaterial color="orange"/>
    </mesh>
)

const BoxGeometry = ({ meshRef }: { meshRef?: any }) => (
    <mesh ref={meshRef} scale={1.5} position-x={2} rotation-y={Math.PI * 0.25}>
        <boxGeometry />
        <meshBasicMaterial color="mediumpurple" />
    </mesh>
)

const PlaneGeometry = ({ meshRef }: { meshRef?: any }) => (
    <mesh ref={meshRef} scale={10.0} position-y={-1} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        <meshBasicMaterial color="greenyellow" side={THREE.DoubleSide} />
    </mesh>
)
const useRefs = () => ({
    boxRef: useRef(null),
    sphereRef: useRef(null),
    planeRef: useRef(null),
    groupRef: useRef(null)
})

const AnimationLoop = ({ meshRef, rotationAxis }: 
    { meshRef: any, rotationAxis: 'x' | 'y' | 'z' }) => {
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation[rotationAxis] += delta;
        }
    });
    return null;
}; 

const CustomOrbitControls = () => {
    const {
    camera,
    gl: { domElement },
    } = useThree()
    return <orbitControls args={[camera, domElement]} />
}

export default function MainCanvas() {
    const { boxRef, sphereRef, planeRef, groupRef } = useRefs()

return (
    <Canvas>
        <group ref={groupRef}>
            <Model meshRef={sphereRef} name="SphereGeometry" />
            <Model meshRef={boxRef} name="BoxGeometry" />
        </group>
        <Model meshRef={planeRef} name="PlaneGeometry" />
        {/* <OrbitControls enableDamping={false} /> */}
        <CustomOrbitControls />
        <GizmoHelper>
            <GizmoViewport />
        </GizmoHelper>
        <AnimationLoop meshRef={boxRef} rotationAxis="y" />
    </Canvas>
)
}