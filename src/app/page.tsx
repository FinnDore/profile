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
                    <div className="mx-auto flex h-32 w-full justify-center px-4 md:max-w-[clamp(80vw,75rem,90vw)] md:-translate-y-16 md:justify-between xl:-translate-y-24">
                        <div className="relative hidden md:block">
                            <Spotify />
                        </div>
                        <div className="my-auto flex flex-col gap-2 text-center md:text-left">
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
                <Projects />
            </QueryClientProvider>
        </main>
    );
}
