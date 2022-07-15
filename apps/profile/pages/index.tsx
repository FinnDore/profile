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
                    <h1 className="bg-gradient-to-br from-stone-900 to-zinc-50 bg-clip-text text-5xl font-extrabold text-transparent sm:text-6xl md:text-8xl">
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
            <Footer />
        </Parallax>
    );
}

function Footer() {
    return (
        <div className="absolute bottom-0 flex h-56 w-full justify-center border-t border-zinc-900 px-20 py-10 lg:px-48">
            <div className="mx-26 my-auto mt-auto flex h-full flex-col ">
                <FooterTitle name={'Contact Me'}></FooterTitle>
                <FooterItem
                    name={'finn@finndore.dev'}
                    href={'mailto:finn@finndore.dev'}
                />
                <FooterItem
                    name={'Git Hub'}
                    href={'https://github.com/FinnDore'}
                />
            </div>
            <div className="mx-28 my-auto flex h-full flex-col">
                <FooterTitle name={'Projects'}></FooterTitle>
                <FooterItem
                    name={'Topic Inspector'}
                    href={'https://topic-inspector.finndore.dev'}
                />
                <FooterItem
                    name={'Kafka Tools'}
                    href={'https://github.com/FinnDore/kafka-tools'}
                />
                <FooterItem
                    name={'Something'}
                    href={'https://something.finndore.dev'}
                />
            </div>
            <div className="mx-26 my-auto mt-auto flex h-full flex-col ">
                <FooterTitle name={'Credits'}></FooterTitle>
                <FooterItem
                    name={'The Moon'}
                    href={'https://www.figma.com/@liammews'}
                />
            </div>
        </div>
    );
}

function FooterTitle({ name }: { name: string }) {
    return <div className="pb-1 text-xs text-white">{name}</div>;
}

function FooterItem({ name, href }: { name: string; href: string }) {
    return (
        <a
            className="pt-1 font-light text-zinc-600 transition-colors hover:text-zinc-100"
            href={href}
            rel="noreferrer"
            target="_blank"
        >
            {name}
        </a>
    );
}
export default function index() {
    return (
        <div className=" relative h-[100vh] bg-black">
            <Page />
        </div>
    );
}
