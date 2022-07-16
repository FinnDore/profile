/* eslint-disable @next/next/no-img-element */
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { useEffect, useRef, useState } from 'react';
import AboutMe from '../ui/about-me';
import Projects from '../ui/projects';
import Star from '../ui/star';
import styles from './index.module.scss';

function Page() {
    const parallaxRef = useRef();
    const [starCount, setStarCount] = useState(100);

    useEffect(() => {
        if (window.innerWidth < 500) {
            setStarCount(50);
        }
        return () => {
            setStarCount(100);
        };
    }, []);

    return (
        <Parallax pages={1.3} ref={parallaxRef}>
            <ParallaxLayer offset={0} speed={0.5}>
                {Array(starCount)
                    .fill(0)
                    .map((_, i) => (
                        <Star key={i} />
                    ))}
            </ParallaxLayer>
            <ParallaxLayer offset={0} speed={3.5}>
                <div className="grid place-items-center">
                    <img
                        className={`${styles.moon} absolute z-[75] w-[150%] max-w-[1512px]`}
                        src="/moon.svg"
                        alt="big grey ball in the sky"
                    />
                </div>
            </ParallaxLayer>
            <ParallaxLayer
                offset={0}
                speed={2.75}
                className="flex justify-center"
            >
                <div className="mb-[10rem] grid place-items-center">
                    <h1 className="bg-gradient-to-br from-stone-900 to-zinc-50 bg-clip-text text-5xl font-extrabold text-transparent sm:text-6xl md:text-8xl">
                        FINN DORE
                    </h1>
                </div>
            </ParallaxLayer>

            <ParallaxLayer
                offset={0.99}
                speed={2.75}
                className="z-[100] grid place-items-center"
            >
                <div className="absolute top-[15vh] z-[9999] px-10 text-zinc-300 md:top-[25vh]  lg:top-[40vh] lg:px-28">
                    <AboutMe />
                    <Projects />
                    <div className="flex">
                        <a
                            className="px-2 pl-0 text-sm text-zinc-400 underline hover:text-zinc-200"
                            href="mailto:finn@finndore.dev"
                            rel="noreferrer"
                            target="_blank"
                        >
                            finn@finndore.dev
                        </a>
                        <a
                            href="https://github.com/FinnDore"
                            rel="noreferrer"
                            target="_blank"
                            className="px-2 text-sm text-zinc-400 underline hover:text-zinc-200"
                        >
                            GitHub
                        </a>
                    </div>
                </div>
            </ParallaxLayer>
        </Parallax>
    );
}

export default function index() {
    return (
        <div className="relative h-[100vh] max-h-[100vh] overflow-hidden bg-black">
            <Page />
        </div>
    );
}
