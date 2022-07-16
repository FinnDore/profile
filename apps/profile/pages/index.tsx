/* eslint-disable @next/next/no-img-element */
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { useRef } from 'react';
import AboutMe from '../ui/about-me';
import Footer from '../ui/footer';
import { Project } from '../ui/projects';
import StarField from '../ui/star-field';
import styles from './index.module.scss';

function Page() {
    const parallaxRef = useRef();
    return (
        <Parallax pages={1.5} ref={parallaxRef}>
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
                    <Project
                        props={{
                            name: 'Kafka Tools',
                            href: 'https://github.com/FinnDore/kafka-tools'
                        }}
                    />
                </div>
            </ParallaxLayer>
            <div className="absolute bottom-0">
                <Footer />
            </div>
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
