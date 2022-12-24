import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { type NextPage } from 'next';
import { useEffect, useRef } from 'react';
import { Vector2, Vector3 } from 'three';
import '../components/background-material';
import type { BackgroundMaterialProps } from '../components/background-material';

const dumbby = new Vector3(1, 1, 1);
function ShaderPlane() {
    const ref = useRef<(THREE.ShaderMaterial & BackgroundMaterialProps) | null>(
        null
    );

    const { width, height } = useThree(state => state.viewport);
    const zoomValue = useRef(256.0);

    const xyValue = useRef(new Vector3(1, 1, 1));

    useEffect(() => {
        const handleScroll = (e: WheelEvent) => {
            if (ref.current) {
                zoomValue.current =
                    e.deltaY < 0
                        ? zoomValue.current + 10
                        : zoomValue.current - 10;
            }
            e.preventDefault();
        };
        const handleMouseMove = (e: MouseEvent) => {
            if (xyValue.current) {
                xyValue.current.add(dumbby);
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('wheel', handleScroll);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('wheel', handleScroll);
        };
    }, []);

    const res = new Vector2(width, height);

    useFrame((state, delta) => {
        if (ref.current && zoomValue.current) {
            ref.current.time += delta;
            ref.current.resolution = res;
            ref.current.zoom = zoomValue.current;
            ref.current.xy = xyValue.current;
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
            <main className=" top-0 h-screen w-screen ">
                <Canvas className="absolute top-0 h-screen w-screen">
                    <ShaderPlane />
                </Canvas>
                <div className="absolute top-0 z-10 h-full w-full text-white bg-blend-color-dodge">
                    <div className="flex h-full w-full">
                        <h1 className="mt-24 ml-10 mb-auto  text-9xl font-bold"></h1>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Home;
