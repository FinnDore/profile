/* eslint-disable @next/next/no-img-element */
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Projects } from "./(components)/projects";
import { Spotify } from "./(components)/spotify";

const queryClient = new QueryClient();

export default function Page() {
    return (
        <main className="flex h-screen flex-col bg-white">
            <QueryClientProvider client={queryClient}>
                <div className="relative z-10 w-screen md:w-auto md:pt-16">
                    <div className="relative mx-auto mt-12 flex select-none contrast-125 md:mt-0">
                        <img
                            className="mx-auto aspect-[5556/3110] w-[clamp(80vw,75rem,90vw)]"
                            src="/finn-small.webp"
                            alt="Picture with the text 'finn'"
                        />
                        <img
                            className="center-absolute aspect-[5556/3110] w-[clamp(80vw,75rem,90vw)]"
                            src="/finn.webp"
                            alt="Picture with the text 'finn'"
                        />
                    </div>
                    <div className="mx-auto mb-14 flex w-full justify-center px-4 md:mb-0 md:h-32 md:max-w-[clamp(80vw,75rem,90vw)] md:-translate-y-16 md:justify-between xl:h-24 xl:-translate-y-24">
                        <div className="relative hidden md:block">
                            <Spotify />
                        </div>
                        <div className="my-auto  flex  gap-2 text-center  md:text-left">
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
                                    href="https://arc.net/folder/F8D3C5D7-7E2A-4FFC-912D-D6C03A0CFD5E"
                                    className="underline transition-all hover:text-rose-500"
                                >
                                    Projects
                                </a>
                            </h2>
                        </div>
                    </div>
                </div>
                <Projects />
            </QueryClientProvider>
        </main>
    );
}
