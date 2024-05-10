"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Spotify } from "./(components)/spotify";

const queryClient = new QueryClient();

/* eslint-disable @next/next/no-img-element */
export default function Page() {
    return (
        <main className="flex h-screen flex-col bg-white">
            <div className="relative m-auto w-screen md:w-auto md:pt-16">
                <img
                    className="relative m-auto aspect-auto max-h-[70vh] contrast-125 md:hidden"
                    src="/finn-sm.webp"
                    alt="Picture with the text 'finn'"
                />
                <img
                    className="relative mx-auto hidden aspect-auto max-w-[clamp(80vw,75rem,90vw)] contrast-125 md:block"
                    src="/finn-crop-small.webp"
                    alt="Picture with the text 'finn'"
                />
                <QueryClientProvider client={queryClient}>
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
                                    {/* <BorderGlowButton>
                                        Projects
                                    </BorderGlowButton>
                                    <BorderGlowButton>Github</BorderGlowButton> */}
                                </div>
                            </div>
                            {/* <Github /> */}
                        </div>
                    </div>
                </QueryClientProvider>
                {/* <Showcase /> */}
            </div>
        </main>
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

import { useEffect, useRef, useState } from "react";

const BorderGlowButton = (props: { children: React.ReactNode }) => {
    const ref = useRef<HTMLButtonElement>(null);
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
        <button
            className="relative transform overflow-hidden rounded-lg bg-[#ffffff] transition-transform ease-in-out active:scale-90"
            ref={ref}
        >
            <span
                className={`absolute z-0 h-28 w-28 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(#6a6a6a_0%,transparent_70%)] `}
                style={
                    {
                        left: mousePosition.x,
                        top: mousePosition.y,
                    } as any
                }
            ></span>
            <div className="text-md relative z-10 m-[1px] rounded-[calc(0.5rem-1px)]  bg-white/90 px-4 py-1  backdrop-blur-sm">
                {props.children}
            </div>
        </button>
    );
};
