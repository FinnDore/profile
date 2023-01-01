import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { GetStaticProps, InferGetStaticPropsType, type NextPage } from 'next';
import Head from 'next/head';
import { lazy, Suspense } from 'react';
import { SpotifyStatus } from '../components/spotify-status';
import { env } from '../env/server.mjs';

const ShaderPlane = lazy(() => import('../components/shader-plane'));

export const getStaticProps = (async () => {
    return {
        props: { isProd: env.NODE_ENV === 'production' }
    };
}) satisfies GetStaticProps;

const Home: NextPage<
    InferGetStaticPropsType<typeof getStaticProps>
> = pageProps => (
    <>
        <Head>
            {pageProps.isProd && (
                <script
                    async
                    defer
                    data-website-id="cb9fc9bb-db7c-4a30-a675-7a9b3052bedf"
                    src="https://umami.finndore.dev/umami.js"
                ></script>
            )}
        </Head>

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
    </>
);

export default Home;
