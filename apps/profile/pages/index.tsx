/* eslint-disable @next/next/no-img-element */
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { useRef } from 'react';
import styles from './index.module.scss';

function Star() {
    return <div className={`${styles.star} absolute bg-amber-200`}></div>;
}

function Page() {
    const parallaxRef = useRef();
    return (
        <Parallax pages={2} ref={parallaxRef}>
            <ParallaxLayer
                offset={0}
                speed={3.5}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <img
                    className={`${styles.moon} absolute`}
                    src="/moon.svg"
                    alt="big grey ball in the sky"
                />
            </ParallaxLayer>
            <ParallaxLayer
                offset={0}
                speed={2.5}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <div className="grid place-items-center">
                    <h1 className="left-50 top-90 absolute bg-gradient-to-br from-stone-900 to-zinc-50 bg-clip-text text-5xl font-extrabold text-transparent sm:text-6xl md:text-8xl">
                        FINN DORE
                    </h1>
                </div>
            </ParallaxLayer>
        </Parallax>
    );
}

export default function index() {
    return (
        <div className="relative flex h-[100vh] bg-black">
            <Star />
            <Page />
        </div>
    );
}
