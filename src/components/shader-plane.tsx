import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import type THREE from 'three';
import { TextureLoader, Vector2 } from 'three';
import '../components/background-material';
import '../components/mosaic-bg';

import type { MosaicProps } from '../components/mosaic-bg';

const ShaderPlane = () => {
    const lastUpdatedHeight = useRef(0);
    const viewport = useThree(state => state.viewport);

    const ref = useRef<(THREE.ShaderMaterial & MosaicProps) | null>(null);

    const { width, height } = useThree(state => state.viewport);
    const zoomValue = useRef(1);

    const u_mouse = useRef(new Vector2(1, 1));

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            u_mouse.current = u_mouse.current.set(e.clientX, e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const res = new Vector2(width, width);

    const [image] = useLoader(TextureLoader, ['/lines.png']);
    const passedImage = useRef(false);
    useFrame((_state, delta) => {
        if (ref.current && zoomValue.current) {
            ref.current.time += delta;
            ref.current.resolution = res;
            if (image && !passedImage.current) {
                passedImage.current = true;
                ref.current.uTexture = image;
            }
        }
    });

    if (!image) {
        return null;
    }

    return (
        <mesh scale={[width, height, 0]}>
            <planeGeometry />
            <mosaicMaterial ref={ref} toneMapped={true} uTexture={image} />
        </mesh>
    );
};
const BackgroundCanvas = () => {
    return (
        <div className="absolute left-0 top-0 z-0  min-w-[1512px]">
            <Canvas>
                <ShaderPlane></ShaderPlane>
            </Canvas>
        </div>
    );
};
export default BackgroundCanvas;
