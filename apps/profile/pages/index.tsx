/* eslint-disable @next/next/no-img-element */
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { useRef } from 'react';
import styles from './index.module.scss';

function Star() {
    return <div className={`${styles.star} r-50 absolute bg-amber-200`}></div>;
}

function Page() {
    const parallaxRef = useRef();
    return (
        <Parallax pages={2} ref={parallaxRef}>
            <ParallaxLayer offset={0} speed={0.5}>
                <Star />
            </ParallaxLayer>
            <ParallaxLayer offset={0} speed={3.5}>
                <img
                    className={`${styles.moon} absolute`}
                    src="/moon.svg"
                    alt="big grey ball in the sky"
                />
            </ParallaxLayer>
            <ParallaxLayer
                offset={0}
                speed={2.75}
                style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <div className="grid place-items-center">
                    <h1 className="left-50 top-90 absolute bg-gradient-to-br from-stone-900 to-zinc-50 bg-clip-text text-5xl font-extrabold text-transparent sm:text-6xl md:text-8xl">
                        FINN DORE
                    </h1>
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={1} speed={5.2}>
                <div className="text-white">
                    <h1 className="bold">Some header</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </p>
                </div>
            </ParallaxLayer>
        </Parallax>
    );
}

export default function index() {
    return (
        <div className="relative h-[100vh] bg-black">
            <Star />
            <Page />
        </div>
    );
}
