import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { type NextPage } from 'next';
import { lazy, Suspense } from 'react';
import { SpotifyStatus } from '../components/spotify-status';

const ShaderPlane = lazy(() => import('../components/shader-plane'));

const Home: NextPage = () => {
    return (
        <main className="h-full w-full">
            <Suspense>
                <ShaderPlane />
            </Suspense>
            <div className="absolute top-0 z-10 h-screen w-full text-white">
                <div className="flex h-full w-full">
                    <h1 className="name m-auto mb-auto text-6xl font-bold italic md:text-7xl lg:text-9xl">
                        FINN DORE
                    </h1>
                </div>
            </div>
            <div className="absolute bottom-0 z-20">
                <SpotifyStatus />
                <a
                    rel="noreferrer"
                    target="_blank"
                    href="https://github.com/finndore"
                    className="absolute right-2 bottom-2 sm:right-4 sm:bottom-4"
                >
                    <GitHubLogoIcon color="white" width={25} height={25} />
                </a>
            </div>
        </main>
    );
};

export default Home;
