'use client'

import { Canvas } from "@react-three/fiber"

export default function CanvasView() {
return (
    <div className="w-full h-full bg-gray-900">
        <Canvas>
            <mesh>
                <torusKnotGeometry />
                <meshNormalMaterial />
            </mesh>
        </Canvas>
    </div>
)
}