"use client";
import {
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
    ExternalLinkIcon,
    GitHubLogoIcon,
    GlobeIcon,
} from "@radix-ui/react-icons";
import { animated, config, useSpring } from "@react-spring/web";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";
import { Github } from "./(components)/github";
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
            <div className="noise absolute left-0 top-0 w-full opacity-40 invert"></div>
            {props.children}
        </div>
    );
}

const Tab = {
    Vote: "Vote",
    One: "One",
};

type Tab = (typeof Tab)[keyof typeof Tab];

function NextButton(props: {
    onClick?: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            className="group relative rounded-md border border-black/20 p-3 shadow-md transition-all hover:border-black/50 hover:shadow-lg"
            onClick={props.onClick}
        >
            <div className="absolute left-0 top-0 h-full w-full shadow-inner"></div>
            <div className="opacity-50 transition-opacity group-hover:opacity-100">
                {props.children}
            </div>
        </button>
    );
}

function Showcase() {
    const [tab, setTab] = useState<Tab>(Tab.Vote);

    const one = tab === Tab.One;
    const oneSpring = useSpring({
        scale: one ? 1 : 0.9,
        rotate: one ? -4 : 0,
        trnaslateY: one ? 0 : 20,
        config: config.wobbly,
    });

    return (
        <div className="z-20 mx-auto flex w-full max-w-6xl flex-col gap-16 pb-24 pt-32">
            <div className="mx-auto flex gap-8">
                <div className="relative max-w-md">
                    <Arc>
                        <picture className="w-full">
                            <img
                                src="/projects/vote/landing-crop.png"
                                alt="Vote"
                                className="rounded-md border border-black/10 shadow-md"
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
                            <picture className="w-full invert">
                                <img
                                    src="/projects/light-2.png"
                                    alt="Vote"
                                    className="rounded-md border border-white/10 shadow-md"
                                />
                            </picture>
                        </Arc>
                    </animated.div>
                </div>
                {tab === Tab.Vote && (
                    <div>
                        <div className="flex gap-4">
                            <h1 className="text-2xl font-bold">Vote</h1>
                            <a
                                href="https://v.finndore.dev/&ref=finndore.dev"
                                className="my-auto flex gap-1 text-sm text-gray-500 underline hover:text-black"
                            >
                                v.finndore.dev
                                <ExternalLinkIcon className="my-auto scale-75" />
                            </a>
                        </div>

                        <p className="max-w-96">
                            A simple voting app. Vote on your favorite user from
                            a list of users. built with Next.js, Prisma, and
                            SQLite. deployed using kubernetes and teraform.
                        </p>
                        <div className="my-2 flex gap-2">
                            <Label
                                bgColor="bg-[#00003d31]"
                                bgGlow="bg-[radial-gradient(#00003d_0%,transparent_70%)]"
                                name="Next.js"
                                smallRound
                            />
                            <Label
                                bgColor="bg-[#0ca5e931]"
                                bgGlow="bg-[radial-gradient(#0ca55e_0%,transparent_70%)]"
                                name="Tailwind"
                                smallRound
                            />
                            <Label
                                bgColor="bg-[#f1672631]"
                                bgGlow="bg-[radial-gradient(#f16726_0%,transparent_70%)]"
                                name="Vitess"
                                smallRound
                            />
                        </div>
                    </div>
                )}

                {one && (
                    <div className="mx-auto flex gap-4">
                        <div>
                            <h1 className="text-2xl font-bold">One</h1>
                            <p className="max-w-96">
                                A IOT light written using embeded Rust along
                                with a companion app made with Tauri and nextjs
                            </p>

                            <div className="my-2 flex gap-2">
                                <Label
                                    bgColor="bg-[#f1672631]"
                                    bgGlow="bg-[radial-gradient(#f16726_0%,transparent_70%)]"
                                    name="Rust"
                                    smallRound
                                />
                                <Label
                                    bgColor="bg-[#00003d31]"
                                    bgGlow="bg-[radial-gradient(#00003d_0%,transparent_70%)]"
                                    name="Next.js"
                                    smallRound
                                />
                                <Label
                                    bgColor="bg-[#0ca5e931]"
                                    bgGlow="bg-[radial-gradient(#0ca55e_0%,transparent_70%)]"
                                    name="Tailwind"
                                    smallRound
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="mx-auto flex gap-4">
                <NextButton onClick={() => setTab(Tab.Vote)}>
                    <DoubleArrowLeftIcon className="scale-125" />
                </NextButton>
                <NextButton onClick={() => setTab(Tab.One)}>
                    <DoubleArrowRightIcon className="scale-125" />
                </NextButton>
            </div>

            {/* <div className="relative h-[700px] overflow-hidden rounded-lg border border-black/10 bg-black p-2 shadow-md dark:bg-white">
                <div className="absolute left-0 top-0 z-0 h-full w-full p-2 ">
                    <div className="noise absolute left-0 top-0 w-full opacity-40 invert"></div>
                    <div className="relative h-full w-full rounded-md border border-black/10 bg-white shadow-md"></div>
                </div>
           </div> */}
        </div>
    );
}
