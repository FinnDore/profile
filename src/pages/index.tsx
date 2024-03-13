import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { type NextPage } from 'next';
import Head from 'next/head';
import { Suspense, lazy } from 'react';
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
                    src="https://umami.finndore.dev/script.js"
                    data-website-id="0acffcd3-e206-4840-bfb2-68c89da2e36e"
                ></script>
            )}
        </Head>

        <main className="h-full w-full">
            <Suspense>
                <ShaderPlane />
            </Suspense>
            <div className="absolute top-0 z-10 h-screen w-full text-white">
                <div className="flex h-full w-full flex-col items-center">
                    <h1 className="name mt-auto text-6xl font-bold italic md:text-7xl lg:text-9xl">
                        FINN DORE
                    </h1>
                    <h2 className="mb-auto italic opacity-80">
                        Ugh, i write code or something -{' '}
                        <a
                            className="underline transition-all hover:text-rose-500"
                            href="https://github.com/finndore"
                        >
                            Github
                        </a>{' '}
                        -{' '}
                        <a
                            href="https://arc.net/folder/3824DB56-5972-45E9-BE4C-D0460E501044"
                            className="underline transition-all hover:text-rose-500"
                        >
                            Projects
                        </a>
                    </h2>
                </div>
            </div>
        </main>
    </>
);

export default Home;
