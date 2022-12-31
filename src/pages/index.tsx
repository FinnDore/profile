import { Canvas } from '@react-three/fiber';
import { type NextPage } from 'next';
import { lazy, Suspense } from 'react';
import '../components/background-material';
import '../components/mosaic-bg';
import { SpotifyStatus } from '../components/spotify-status';

const ShaderPlane = lazy(() => import('../components/shader-plane'));

const Home: NextPage = () => {
    return (
        <main className="h-screen w-screen ">
            <Suspense>
                <Canvas dpr={[1, 2]} className="h-screen min-h-max min-w-max">
                    <Suspense fallback={null}>
                        <ShaderPlane />
                    </Suspense>
                    {/* <Stats showPanel={0} className="stats" /> */}
                </Canvas>
            </Suspense>
            <div className="absolute top-0 z-10 h-screen w-full text-white bg-blend-color-dodge">
                <div className="flex h-screen w-full">
                    <h1 className="name m-auto mb-auto text-4xl font-bold italic sm:text-6xl md:text-7xl lg:text-9xl">
                        FINN DORE
                    </h1>
                </div>
            </div>
            <div className="absolute bottom-0 z-20">
                <SpotifyStatus />
            </div>
        </main>
    );
};

export default Home;
