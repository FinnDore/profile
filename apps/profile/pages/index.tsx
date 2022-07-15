/* eslint-disable @next/next/no-img-element */
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { useRef } from 'react';
import AboutMe from '../ui/about-me';
import { StarField } from '../ui/star-field';
import styles from './index.module.scss';

function Page() {
    const parallaxRef = useRef();
    return (
        <Parallax pages={2} ref={parallaxRef}>
            <ParallaxLayer offset={0} speed={0.5}>
                <StarField />
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
                    <h1 className="left-50 top-90 absolute bg-gradient-to-br from-stone-900 to-zinc-50 bg-clip-text text-5xl font-extrabold text-transparent sm:text-6xl md:text-8xl">
                        FINN DORE
                    </h1>
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={0.99} speed={2.75} className="z-[100]">
                <div className="grid place-items-center">
                    <AboutMe />
                </div>
            </ParallaxLayer>
            <ParallaxLayer factor={20}></ParallaxLayer>
        </Parallax>
    );
}

export default function index() {
    return (
        <div className=" relative h-[100vh] bg-black">
            <Page />
        </div>
    );
}
