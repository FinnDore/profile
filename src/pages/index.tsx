import { Canvas } from '@react-three/fiber';
import { type NextPage } from 'next';
import { Suspense } from 'react';
import '../components/background-material';
import '../components/mosaic-bg';
import { ShaderPlane } from '../components/shader-plane';
import { SpotifyStatus } from '../components/spotify-status';

const Home: NextPage = () => {
    return (
        <main className=" top-0 h-screen w-screen ">
            <Canvas
                dpr={[1, 2]}
                className="e top-0  aspect-square min-h-max min-w-max"
            >
                <Suspense fallback={null}>
                    <ShaderPlane />
                </Suspense>
                {/* <Stats showPanel={0} className="stats" /> */}
            </Canvas>
            <div className="absolute top-0 z-10 h-screen w-full text-white bg-blend-color-dodge">
                <div className="flex h-screen w-full">
                    <h1 className="name m-auto mb-auto text-9xl font-bold italic">
                        FINN DORE
                    </h1>
                </div>
            </div>
            <div className="absolute bottom-0">
                <SpotifyStatus />
            </div>
        </main>
    );
};

export default Home;
