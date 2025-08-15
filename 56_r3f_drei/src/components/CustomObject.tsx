import * as THREE from 'three';
import { useMemo,
        useRef,
        useEffect} from 'react'; 

export default function CustomObject() {

    const geometryRef = useRef<THREE.BufferGeometry>(null);

    const verticesCount = 10 * 3 /* 10 triangles * 3 vertices per triangle */

    const positions = useMemo(() => {
        const positions = new Float32Array(verticesCount * 3);
        for (let i = 0; i < verticesCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 3;
        }
        return positions;
    }, [verticesCount]); // only if verticesCount changes re-compute positions


    useEffect(() => {
        geometryRef.current?.computeVertexNormals();
    }, []);

    return (
        <>
            <mesh>
                <bufferGeometry ref={geometryRef}>
                    <bufferAttribute args={[positions, 3]} 
                        attach="attributes-position" 
                    />
                </bufferGeometry>
                <meshStandardMaterial color="red" side={THREE.DoubleSide} />
            </mesh>
        </>
    );
}
