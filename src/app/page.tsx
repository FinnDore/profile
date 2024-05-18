"use client";
import { GitHubLogoIcon, GlobeIcon } from "@radix-ui/react-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Github } from "./(components)/github";
import { Label } from "./(components)/label";
import { Location } from "./(components)/location";
import { Spotify, SpotifyBento } from "./(components)/spotify";
import { VoteButton } from "./(components)/vote-button";

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
                <div className="mx-auto flex flex-wrap gap-16 px-12 py-12">
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
                    <div className="flex h-full flex-col">
                        <Label
                            bgColor="bg-[#1CD76031]"
                            bgGlow="bg-[radial-gradient(#1CD760_0%,transparent_70%)]"
                            name="Spotify"
                            icon={<img src="/spotify.png" alt="Spotify logo" />}
                        />
                        <div className="my-auto">
                            <SpotifyBento />
                        </div>
                    </div>
                </div>
            </QueryClientProvider>
        </main>
    );
}

function ProjectName(props: { children: React.ReactNode }) {
    return (
        <div className="relative mx-auto transform select-none overflow-hidden rounded-md bg-slate-200/40 px-8 py-6 transition-transform ease-in-out active:scale-90">
            {props.children}
        </div>
    );
}

function Showcase() {
    return (
        <div className="gap-13 z-20  mx-auto flex w-full max-w-6xl flex-col pb-12 pt-32">
            <div className="flex py-6">
                <VoteButton
                    users={[
                        {
                            name: "finndore",
                            id: "1",
                            image: "https://avatars.githubusercontent.com/u/34718806?s=40&v=4",
                            pfpHash: "1",
                        },
                    ]}
                />
                <ProjectName>Vote</ProjectName>
            </div>
            <div className="relative h-[700px] overflow-hidden rounded-lg border border-black/10 bg-black p-2 shadow-md dark:bg-white">
                <div className="absolute left-0 top-0 z-0 h-full w-full p-2 ">
                    <div className="noise absolute left-0 top-0 w-full opacity-40 invert"></div>
                    <div className="relative h-full w-full rounded-md border border-black/10 bg-white shadow-md"></div>
                </div>
                <div className="relative flex h-full flex-col p-4">
                    <h1 className="mb-4 text-2xl font-bold">Vote</h1>
                    <div className="mt-auto flex">
                        <picture>
                            <img
                                src="/projects/v-dark.png"
                                alt="Vote"
                                className="rounded-md"
                            />
                        </picture>
                        <picture>
                            <img
                                src="/projects/v-light.png"
                                alt="Vote"
                                className="rounded-md"
                            />
                        </picture>
                    </div>
                </div>
            </div>
        </div>
    );
}
