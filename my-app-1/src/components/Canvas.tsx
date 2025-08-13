'use client'

import { Canvas } from "@react-three/fiber"

export default function CanvasView() {
return (
    <div className="w-full h-full">
        <Canvas>
            <mesh>
                <torusKnotGeometry />
                <meshNormalMaterial />
            </mesh>
        </Canvas>
    </div>
)
}