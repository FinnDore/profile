"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Github } from "./(components)/github";
import { Spotify } from "./(components)/spotify";

const queryClient = new QueryClient();

/* eslint-disable @next/next/no-img-element */
export default function Page() {
    return (
        <QueryClientProvider client={queryClient}>
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
                    <div className="mx-auto flex h-16 w-full justify-between px-4 md:max-w-[clamp(80vw,75rem,90vw)] md:-translate-y-16 xl:-translate-y-24">
                        <div className="mx-auto">
                            <h1>
                                Ugh, i write code or somthing
                                {" - "}
                                <a
                                    href="https://finndore.dev"
                                    className="underline"
                                >
                                    projects
                                </a>
                                {" - "}
                                <a
                                    href="https://finndore.dev/g"
                                    className="underline"
                                >
                                    github
                                </a>
                            </h1>
                        </div>
                    </div>
                    {/* <Showcase /> */}
                </div>

                <div className="pointer-events-none fixed z-50 flex h-screen w-full flex-col justify-end">
                    <div className="pointer-events-auto flex w-full justify-end p-2 md:p-4">
                        <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4">
                            <Spotify />
                        </div>

                        <Github />
                    </div>
                </div>
            </main>
        </QueryClientProvider>
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
