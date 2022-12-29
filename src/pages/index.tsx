import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { type NextPage } from 'next';
import { useEffect, useRef } from 'react';
import THREE, { TextureLoader, Vector2, Vector3 } from 'three';
import '../components/background-material';
import '../components/mosaic-bg';

import { Stats } from '@react-three/drei';
import { MosaicProps } from '../components/mosaic-bg';
const dumbby = new Vector3(1, 1, 1);

function ShaderPlane() {
    const ref = useRef<(THREE.ShaderMaterial & MosaicProps) | null>(null);

    const { width, height } = useThree(state => state.viewport);
    const zoomValue = useRef(1);

    const xyValue = useRef(new Vector3(1, 1, 1));

    useEffect(() => {
        const handleScroll = (e: WheelEvent) => {
            return;
            if (ref.current) {
                zoomValue.current =
                    e.deltaY < 0
                        ? zoomValue.current + 10
                        : zoomValue.current - 10;
            }
        };
        const handleMouseMove = (e: MouseEvent) => {
            if (xyValue.current) {
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('wheel', handleScroll);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('wheel', handleScroll);
        };
    }, []);

    const res = new Vector2(width, width);

    const [image] = useLoader(TextureLoader, [
        'https://images.unsplash.com/photo-1604011092346-0b4346ed714e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80'
    ]);

    useFrame((state, delta) => {
        if (ref.current && zoomValue.current) {
            ref.current.time += delta;
            ref.current.resolution = res;
            ref.current.zoom = zoomValue.current;
            ref.current.xy = xyValue.current;
            // if (ref.current.uniforms.canvasTexture?.value) {
            //     ref.current.uniforms.canvasTexture.value.needsUpdate = true;
            // }
        }
    });

    return (
        <mesh scale={[width, height, 1]}>
            <planeGeometry />
            <mosaicMaterial ref={ref} toneMapped={true} uTexture={image} />
        </mesh>
    );
}

const Home: NextPage = () => {
    return (
        <main className=" top-0 h-screen w-screen ">
            <div className="line absolute top-32 right-32 h-10 w-20 mix-blend-color-dodge"></div>
            <Canvas
                dpr={[1, 2]}
                className="e top-0  aspect-square min-h-max min-w-max"
            >
                <ShaderPlane />
                <Stats showPanel={0} className="stats" />
            </Canvas>
            <div className="absolute top-0 z-10 h-screen w-full text-white bg-blend-color-dodge">
                <div className="flex h-screen w-full">
                    <h1 className="m-auto mb-auto  text-9xl font-bold italic">
                        FINN DORE
                    </h1>
                </div>
            </div>
        </main>
    );
};

export default Home;
