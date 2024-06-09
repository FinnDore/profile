/* eslint-disable @next/next/no-img-element */
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Image from "next/image";
import { Projects } from "./(components)/projects";
import { Spotify } from "./(components)/spotify";

const queryClient = new QueryClient();

export default function Page() {
    return (
        <main className="flex h-screen flex-col bg-white">
            <QueryClientProvider client={queryClient}>
                <div className="relative z-10 w-screen md:w-auto md:pt-16">
                    <div className="relative mx-auto mt-12 flex select-none contrast-125 md:mt-0">
                        <Image
                            className="mx-auto w-[clamp(80vw,75rem,90vw)]"
                            src="/finn.webp"
                            alt="Picture with the text 'finn'"
                            width={5556}
                            height={3110}
                        />
                    </div>
                    <div className="mx-auto mb-10 flex w-full justify-center px-4 md:mb-0 md:h-32 md:max-w-[clamp(80vw,75rem,90vw)] md:-translate-y-16 md:justify-between xl:h-24 xl:-translate-y-24">
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
                                    href="https://arc.net/folder/E3A9ACC9-406D-414D-B9FF-12C2F113DE67"
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
