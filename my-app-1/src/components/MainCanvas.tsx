'use client'

import { Canvas } from "@react-three/fiber"
import { GizmoHelper,
        GizmoViewport,
        OrbitControls } from "@react-three/drei"

type ModelProps = {
    name: string;
};

const Model = ({ name }: ModelProps) => {
    if (name === "SphereGeometry") {
        return <SphereGeometry />;
    }
    if (name === "BoxGeometry") {
        return <BoxGeometry />;
    }
    return null;
}

const SphereGeometry = () => (
<mesh scale={1.5} position={[0, 0, 0]} rotateY={Math.PI / 4}>
    <sphereGeometry args={[1.5, 32, 32]}/>
    <meshBasicMaterial color="mediumpurple" wireframe/>
</mesh>
)

const BoxGeometry = () => (
    <mesh position={[0, 0, 0]} rotation-z={Math.PI / 4}>
        <boxGeometry/>
        <meshBasicMaterial color="mediumpurple" />
    </mesh>
)

export default function MainCanvas() {
return (
    <Canvas>
        <Model name="SphereGeometry" />
        <Model name="BoxGeometry" />
        <OrbitControls enableDamping={false} />
        <GizmoHelper>
            <GizmoViewport />
        </GizmoHelper>
    </Canvas>
)
}