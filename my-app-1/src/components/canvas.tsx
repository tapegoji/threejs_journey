'use client'

import { Canvas } from "@react-three/fiber"

export default function CanvasView() {
    return (
    <>
        <Canvas>
            <mesh>
                <torusKnotGeometry />
                <meshNormalMaterial />
            </mesh>
        </Canvas>
    </>
)
}