"use client";
import {
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
    ExternalLinkIcon,
    GitHubLogoIcon,
    GlobeIcon,
} from "@radix-ui/react-icons";
import { animated, config, useInView, useSpring } from "@react-spring/web";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { Github } from "./(components)/github";
import { Glitch } from "./(components)/glitch";
import { Label } from "./(components)/label";
import { Location } from "./(components)/location";
import { Spotify, SpotifyBento } from "./(components)/spotify";

const queryClient = new QueryClient();

/* eslint-disable @next/next/no-img-element */
export default function Page() {
    return (
        <main className="flex h-screen flex-col bg-white">
            <QueryClientProvider client={queryClient}>
                <div className="relative z-10 m-auto w-screen md:w-auto md:pt-16">
                    <img
                        className="relative m-auto aspect-auto max-h-[70vh] select-none contrast-125 md:hidden"
                        src="/finn-sm.webp"
                        alt="Picture with the text 'finn'"
                    />
                    <img
                        className="relative mx-auto hidden aspect-auto max-w-[clamp(80vw,75rem,90vw)] select-none contrast-125 md:block"
                        src="/finn-crop-small.webp"
                        alt="Picture with the text 'finn'"
                    />
                    <div className="absolute mx-auto flex h-32 w-full justify-between px-4 md:max-w-[clamp(80vw,75rem,90vw)] md:-translate-y-16 xl:-translate-y-24">
                        <Spotify />
                        <div className="my-auto flex flex-col gap-2">
                            <div className="flex gap-2">
                                <h2 className="mb-auto italic opacity-80">
                                    Ugh, i write code or something
                                    {" - "}
                                    <a
                                        className="underline transition-all hover:text-rose-500"
                                        href="https://github.com/finndore"
                                    >
                                        Github
                                    </a>
                                    {" - "}
                                    <a
                                        href="https://arc.net/folder/3824DB56-5972-45E9-BE4C-D0460E501044"
                                        className="underline transition-all hover:text-rose-500"
                                    >
                                        Projects
                                    </a>
                                </h2>
                            </div>
                        </div>
                    </div>
                    {/* <Showcase /> */}
                </div>
                <Showcase />
                <div className="mx-auto flex flex-wrap gap-16 px-12 pb-12">
                    <div className="flex h-full flex-col">
                        <div className="mx-auto">
                            <Label
                                bgColor="bg-[#ff003d31]"
                                bgGlow="bg-[radial-gradient(#ff003d_0%,transparent_70%)]"
                                name="Location"
                                icon={<GlobeIcon />}
                            />
                        </div>
                        <div className="my-auto">
                            <Location />
                        </div>
                    </div>
                    <div className="w-[1px] bg-black/10"></div>
                    <div className="flex h-full flex-col">
                        <div className="mx-auto">
                            <Label
                                bgColor="bg-[#6a6a6a31]"
                                bgGlow="bg-[radial-gradient(#6a6a6a_0%,transparent_70%)]"
                                name="GitHub"
                                icon={<GitHubLogoIcon />}
                            />
                        </div>
                        <div className="my-auto">
                            <Github />
                        </div>
                    </div>
                    <div className="w-[1px] bg-black/10"></div>
                    <div className="flex h-full flex-col">
                        <div className="mx-auto">
                            <Label
                                bgColor="bg-[#1CD76031]"
                                bgGlow="bg-[radial-gradient(#1CD760_0%,transparent_70%)]"
                                name="Spotify"
                                icon={
                                    <img
                                        src="/spotify.png"
                                        alt="Spotify logo"
                                    />
                                }
                            />
                        </div>
                        <div className="my-auto">
                            <SpotifyBento />
                        </div>
                    </div>
                </div>
            </QueryClientProvider>
        </main>
    );
}

function Arc(props: { children: React.ReactNode; className?: string }) {
    return (
        <div
            className={clsx(
                props.className,
                "max-w-md rounded-md border border-black/10 bg-white p-1 shadow-md",
            )}
        >
            <div className="noise absolute left-0 top-0 w-full rounded-md opacity-40 invert"></div>
            <div className="relative h-full w-full rounded-md border border-black/10 bg-white/65 shadow-lg">
                {props.children}
            </div>
        </div>
    );
}

const Tab = {
    Vote: "Vote",
    One: "One",
    Spotify: "Spotify",
    Location: "Location",
};

type Tab = (typeof Tab)[keyof typeof Tab];

function NextButton(props: {
    onClick?: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            className="group relative transform rounded-md border border-black/20 p-3 shadow-md transition-all ease-in-out hover:border-black/50 hover:shadow-lg active:scale-90"
            onClick={props.onClick}
        >
            <div className="absolute left-0 top-0 h-full w-full shadow-inner"></div>
            <div className="opacity-50 transition-opacity group-hover:opacity-100 ">
                {props.children}
            </div>
        </button>
    );
}

function Progress(props: { pause: boolean; next: (auto?: boolean) => void }) {
    return (
        <div className="h-1 w-full overflow-hidden rounded-md bg-black/10 opacity-35 ">
            <div
                style={{
                    animationPlayState: props.pause ? "paused" : "running",
                }}
                onAnimationIteration={() => props.next(true)}
                className="progress-bar h-full w-full rounded-md bg-black/50 transition-all"
            ></div>
        </div>
    );
}

function Description(props: {
    children: React.ReactNode;
    title: React.ReactNode;
    link: { url: string; name: string };
    description: string;
}) {
    return (
        <div>
            <div className="flex gap-4">
                <h1 className="text-2xl font-bold">{props.title}</h1>
                <a
                    href={props.link.url}
                    className="my-auto flex gap-1 text-sm text-gray-500 underline hover:text-black"
                >
                    {props.link.name}
                    <ExternalLinkIcon className="my-auto scale-75" />
                </a>
            </div>

            <p className="max-w-96 pt-1">{props.description}</p>
            <div className="my-2 flex gap-2">{props.children}</div>
        </div>
    );
}

function Showcase() {
    const [tab, setTab] = useState<Tab>(Tab.Vote);
    const [pause, setPause] = useState(true);
    const [reverse, setReverse] = useState(false);

    const pauseTimeout = useRef<NodeJS.Timeout | null>(null);

    const location = tab === Tab.Location;
    const spot = tab === Tab.Spotify || location;
    const one = tab === Tab.One || spot;
    const oneSpring = useSpring({
        scale: one ? 1 : 0.9,
        rotate: one ? -4 : 0,
        trnaslateY: one ? 0 : 20,
        config: config.wobbly,
    });
    const spotSpring = useSpring({
        scale: spot ? 1 : 0.9,
        rotate: spot ? 4 : 0,
        trnaslateY: spot ? 0 : 20,
        config: config.wobbly,
    });
    const locationSpring = useSpring({
        scale: location ? 1 : 0.9,
        rotate: location ? -3 : 0,
        trnaslateY: location ? 0 : 20,
        config: config.wobbly,
    });

    const { next, prev } = useMemo(() => {
        const tabs = Object.values(Tab);
        const index = tabs.indexOf(tab);
        const resetTimer = () => {
            if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
            setPause(true);
            pauseTimeout.current = setTimeout(() => setPause(false), 15000);
        };
        return {
            next: (auto?: boolean) => {
                if (!auto) {
                    resetTimer();
                }
                if (index + 1 === tabs.length - 1) {
                    setReverse(true);
                }
                setTab(tabs[index + 1] ?? tabs[tabs.length - 1] ?? Tab.Vote);
            },
            prev: (auto?: boolean) => {
                if (!auto) {
                    resetTimer();
                }
                if (index === 1) {
                    setReverse(false);
                }
                setTab(tabs[index - 1] ?? tabs[0] ?? Tab.Vote);
            },
        };
    }, [tab, setTab, setReverse, setPause]);

    const [ref, inview] = useInView({
        once: true,
        amount: 0.5,
    });

    useEffect(() => {
        if (inview) {
            setPause(false);
        }
    }, [inview]);

    return (
        <div
            ref={ref}
            className="z-20 mx-auto flex w-full max-w-6xl flex-col gap-16 pb-24 pt-32"
        >
            <div className="mx-auto flex gap-8">
                <div className="relative max-w-md">
                    <Arc>
                        <picture className="w-full">
                            <img
                                src="/projects/vote/landing-crop.png"
                                alt="Vote"
                                className="rounded-md"
                            />
                        </picture>
                    </Arc>

                    <animated.div
                        style={oneSpring}
                        className={clsx(
                            "absolute top-0 transition-opacity duration-200",
                            {
                                "opacity-0": !one,
                                "opacity-100": one,
                            },
                        )}
                    >
                        <Arc>
                            <picture className="w-full rounded-md invert">
                                <img src="/projects/light-2.png" alt="Vote" />
                            </picture>
                        </Arc>
                    </animated.div>

                    <animated.div
                        style={spotSpring}
                        className={clsx(
                            "absolute top-0 transition-opacity duration-200",
                            {
                                "opacity-0": !spot,
                                "opacity-100": spot,
                            },
                        )}
                    >
                        <Arc className="h-80 w-[26rem]">
                            <div className="grid h-full place-content-center rounded-md">
                                <Spotify />
                            </div>
                        </Arc>
                    </animated.div>
                    <animated.div
                        style={locationSpring}
                        className={clsx(
                            "absolute top-0 transition-opacity duration-200",
                            {
                                "opacity-0": !location,
                                "opacity-100": location,
                            },
                        )}
                    >
                        <Arc className="h-80 w-[26rem]">
                            <div className="grid h-full place-content-center rounded-md">
                                <Location hideWeather />
                            </div>
                        </Arc>
                    </animated.div>
                </div>
                {tab === Tab.Vote && (
                    <Description
                        title={
                            <div className="flex">
                                <b>V</b>
                                <Glitch text="ote" />
                            </div>
                        }
                        link={{
                            url: "https://vote.finndore.dev",
                            name: "vote.finndore.dev",
                        }}
                        description="Pointing poker is a waste of time, but to make it as painless as possible ive made modern pointing website. I've utilised websockets to update the UI in real time (try the vote on the front page!)."
                    >
                        <Label
                            bgColor="bg-[#00003d31]"
                            bgGlow="bg-[radial-gradient(#00003d_0%,transparent_70%)]"
                            name="Next.js"
                            className="cursor-pointer"
                            smallRound
                        />
                        <Label
                            bgColor="bg-[#0ca5e931]"
                            bgGlow="bg-[radial-gradient(#0ca55e_0%,transparent_70%)]"
                            name="Tailwind"
                            className="cursor-pointer"
                            smallRound
                        />
                        <Label
                            bgColor="bg-[#f1672631]"
                            bgGlow="bg-[radial-gradient(#f16726_0%,transparent_70%)]"
                            name="Vitess"
                            className="cursor-pointer"
                            smallRound
                        />
                    </Description>
                )}

                {tab === Tab.One && (
                    <Description
                        title="One"
                        link={{
                            url: "https://github.com/finndore/one",
                            name: "finndore/one",
                        }}
                        description="A IOT light written using embeded Rust along with a companion app made with Tauri and nextjs"
                    >
                        <Label
                            bgColor="bg-[#f1672631]"
                            bgGlow="bg-[radial-gradient(#f16726_0%,transparent_70%)]"
                            name="Rust"
                            className="cursor-pointer"
                            smallRound
                        />
                        <Label
                            bgColor="bg-[#00003d31]"
                            bgGlow="bg-[radial-gradient(#00003d_0%,transparent_70%)]"
                            name="Next.js"
                            className="cursor-pointer"
                            smallRound
                        />
                        <Label
                            bgColor="bg-[#0ca5e931]"
                            bgGlow="bg-[radial-gradient(#0ca55e_0%,transparent_70%)]"
                            name="Tailwind"
                            className="cursor-pointer"
                            smallRound
                        />
                    </Description>
                )}
                {tab === Tab.Spotify && (
                    <Description
                        title="Spot"
                        link={{
                            url: "https://github.com/finndore/spot",
                            name: "finndore/spot",
                        }}
                        description="A spotify api wrapper built to serve top songs and current songs data. Spot also allows control of the currently playing song"
                    >
                        <Label
                            bgColor="bg-[#f1672631]"
                            bgGlow="bg-[radial-gradient(#f16726_0%,transparent_70%)]"
                            name="Rust"
                            className="cursor-pointer"
                            smallRound
                        />
                    </Description>
                )}
                {tab === Tab.Location && (
                    <Description
                        title="Location"
                        link={{
                            url: "https://github.com/finndore/location",
                            name: "finndore/location",
                        }}
                        description="A simple location api that returns my location and weather for that location."
                    >
                        <Label
                            bgColor="bg-[#f1672631]"
                            bgGlow="bg-[radial-gradient(#f16726_0%,transparent_70%)]"
                            name="Rust"
                            className="cursor-pointer"
                            smallRound
                        />
                    </Description>
                )}
            </div>
            <div className="mx-auto flex flex-col gap-4">
                <div className="flex gap-4">
                    <NextButton onClick={() => prev()}>
                        <DoubleArrowLeftIcon className="scale-125" />
                    </NextButton>
                    <NextButton onClick={() => next()}>
                        <DoubleArrowRightIcon className="scale-125" />
                    </NextButton>
                </div>
                <Progress pause={pause} next={reverse ? prev : next} />
            </div>
        </div>
    );
}
