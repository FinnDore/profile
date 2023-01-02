import { Stats } from '@react-three/drei';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { useRef, useState } from 'react';
import type THREE from 'three';
import { Clock, TextureLoader, Vector2 } from 'three';
import '../components/mosaic-bg';
import type { MosaicProps } from '../components/mosaic-bg';

const ShaderPlane = () => {
    const ref = useRef<(THREE.ShaderMaterial & MosaicProps) | null>(null);
    const { width, height } = useThree(state => state.viewport);
    const res = new Vector2(width, width);
    const [clock] = useState(new Clock());
    const [image] = useLoader(TextureLoader, ['/lines.png']);
    const passedImage = useRef(false);

    useFrame((state, delta) => {
        const timeUntilNextFrame = 500 - clock.getDelta();

        setTimeout(() => {
            state.invalidate();
        }, Math.max(0, timeUntilNextFrame));

        if (ref.current) {
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
        <div className="left-0 top-0 z-0 h-full min-h-screen min-w-[1512px]">
            <Canvas frameloop="demand">
                <Stats />
                <ShaderPlane></ShaderPlane>
            </Canvas>
        </div>
    );
};
export default BackgroundCanvas;
