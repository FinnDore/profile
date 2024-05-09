"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Github } from "./(components)/github";
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
                            <Github />
                        </div>
                    </div>
                </QueryClientProvider>
                <Showcase />
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
