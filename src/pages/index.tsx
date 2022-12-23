import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { type NextPage } from 'next';
import { useEffect, useRef } from 'react';
import { Vector2 } from 'three';
//import source from 'raw-loader!glslify-loader!./public/shaders/blob/vertex.glsl'
import './background-material';
import type { BackgroundMaterialProps } from './background-material';

function ShaderPlane() {
    const ref = useRef<(THREE.ShaderMaterial & BackgroundMaterialProps) | null>(
        null
    );
    const { width, height } = useThree(state => state.viewport);
    const zoomValue = useRef(256.0);
    // use effect for scroll event
    useEffect(() => {
        const handleScroll = (e: WheelEvent) => {
            console.log(e);
            if (ref.current) {
                zoomValue.current =
                    e.deltaY < 0
                        ? zoomValue.current + 10
                        : zoomValue.current - 10;
            }
            e.preventDefault();
        };
        window.addEventListener('wheel', handleScroll);
        return () => window.removeEventListener('wheel', handleScroll);
    }, []);

    const res = new Vector2(width, height);

    useFrame((state, delta) => {
        if (ref.current && zoomValue.current) {
            ref.current.time += delta;
            ref.current.resolution = res;
            ref.current.zoom = zoomValue.current;
        }
    });
    return (
        <mesh scale={[width, height, 1]}>
            <planeGeometry />
            <backgroundMaterial ref={ref} toneMapped={true} />
        </mesh>
    );
}

const Home: NextPage = () => {
    return (
        <>
            <main className="h-screen bg-black">
                <Canvas className="h-screen w-screen grayscale">
                    {' '}
                    <ShaderPlane />
                </Canvas>
            </main>
        </>
    );
};

export default Home;
