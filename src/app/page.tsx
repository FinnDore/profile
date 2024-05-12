"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Location } from "./(components)/location";
import { Spotify } from "./(components)/spotify";

const queryClient = new QueryClient();

/* eslint-disable @next/next/no-img-element */
export default function Page() {
    return (
        <main className="flex h-screen flex-col bg-white">
            <QueryClientProvider client={queryClient}>
                <div className="relative m-auto w-screen md:w-auto md:pt-16">
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
                    <div className="h-16">
                        <div className="absolute mx-auto flex w-full justify-between px-4 md:max-w-[clamp(80vw,75rem,90vw)] md:-translate-y-16 xl:-translate-y-24">
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
                    </div>
                    {/* <Showcase /> */}
                </div>
                <div className="flex gap-16 px-12 py-32">
                    <div className="flex h-full flex-col">
                        <Label
                            bgColor="bg-[#ff003d31]"
                            bgGlow="bg-[radial-gradient(#ff003d_0%,transparent_70%)]"
                            name="Location"
                            icon={<GlobeIcon />}
                        />
                        <div className="my-auto">
                            <Location />
                        </div>
                    </div>
                    <div className="w-[1px] bg-black/10"></div>
                    <div className="flex h-full flex-col">
                        <Label
                            bgColor="bg-[#6a6a6a31]"
                            bgGlow="bg-[radial-gradient(#6a6a6a_0%,transparent_70%)]"
                            name="GitHub"
                            icon={<GitHubLogoIcon />}
                        />
                        <div className="my-auto">
                            <Github />
                        </div>
                    </div>
                    <div className="w-[1px] bg-black/10"></div>
                </div>
            </QueryClientProvider>
        </main>
    );
}

function Label(props: {
    name: string;
    icon: React.ReactNode;
    bgColor: `bg-[${string}]`;
    bgGlow: `bg-[radial-gradient(#${string}_0%,transparent_70%)]`;
}) {
    return (
        <BorderGlowButton bgColor={props.bgColor} bgGlow={props.bgGlow}>
            <div className="my-auto h-4 w-4">{props.icon}</div>
            <span className="text-sm">{props.name}</span>
        </BorderGlowButton>
    );
}

function Showcase() {
    return (
        <div className="gap-13 flex flex-col pb-12">
            <div className="mx-12">
                <h1 className="mb-4 text-2xl font-bold">Vote</h1>
                <div className="relative h-[700px] rounded-md bg-black p-2 shadow-2xl dark:bg-white">
                    <div className="noise"></div>
                    <iframe
                        src="https://v.finndore.dev"
                        className="relative z-10 h-full w-full rounded"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

import { GitHubLogoIcon, GlobeIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { Github } from "./(components)/github";

const BorderGlowButton = (props: {
    children: React.ReactNode;
    bgColor: `bg-[${string}]`;
    bgGlow: `bg-[radial-gradient(#${string}_0%,transparent_70%)]`;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({
        x: "-100%",
        y: "-100%",
    });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setMousePosition({ x: `${x}px`, y: `${y}px` });
        };
        document.addEventListener("mousemove", handleMouseMove);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div
            className={clsx(
                "relative mx-auto transform overflow-hidden rounded-2xl transition-transform ease-in-out active:scale-90",
                props.bgColor,
            )}
            ref={ref}
        >
            <span
                className={clsx(
                    `absolute z-0 h-28 w-28 -translate-x-1/2 -translate-y-1/2  `,
                    props.bgGlow,
                )}
                style={
                    {
                        left: mousePosition.x,
                        top: mousePosition.y,
                    } as any
                }
            ></span>
            <div className="relative z-10 m-[1px] flex gap-2 rounded-2xl  bg-white/90 px-4 py-1  backdrop-blur-sm">
                {props.children}
            </div>
        </div>
    );
};
