import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import type THREE from 'three';
import { TextureLoader, Vector2, Vector3 } from 'three';
import '../components/background-material';
import '../components/mosaic-bg';

import type { MosaicProps } from '../components/mosaic-bg';

const ShaderPlane = () => {
    const ref = useRef<(THREE.ShaderMaterial & MosaicProps) | null>(null);

    const { width, height } = useThree(state => state.viewport);
    const zoomValue = useRef(1);

    const xyValue = useRef(new Vector3(1, 1, 1));

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (xyValue.current) {
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const res = new Vector2(width, width);

    const [image] = useLoader(TextureLoader, ['/lines.png']);
    console.log(image);
    useFrame((state, delta) => {
        if (ref.current && zoomValue.current) {
            ref.current.time += delta;
            ref.current.resolution = res;
            ref.current.zoom = zoomValue.current;
            ref.current.xy = xyValue.current;
            if (image) {
                ref.current.uTexture = image;
            }
            // if (ref.current.uniforms.canvasTexture?.value) {
            //     ref.current.uniforms.canvasTexture.value.needsUpdate = true;
            // }
        }
    });

    if (!image) {
        return null;
    }

    return (
        <mesh scale={[width, height, 1]}>
            <planeGeometry />
            <mosaicMaterial ref={ref} toneMapped={true} uTexture={image} />
        </mesh>
    );
};

export default ShaderPlane;
