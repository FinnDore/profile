"use client";
import { animated, config, useSpring } from "@react-spring/web";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from "@tanstack/react-query";
import clsx from "clsx";
import { IBM_Plex_Mono } from "next/font/google";
import { useMemo, useState } from "react";
import type { Album, CurrentSong, Item } from "../_types/spotify";

const ibm_plex_mono = IBM_Plex_Mono({
    weight: ["400", "600"],
    subsets: ["latin"],
});
const queryClient = new QueryClient();

/* eslint-disable @next/next/no-img-element */
export default function Page() {
    return (
        <main className="flex h-screen flex-col bg-white">
            <div className="relative m-auto w-screen md:w-auto">
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
                    <div className="absolute mx-auto flex w-full justify-between px-4 md:max-w-[clamp(80vw,75rem,90vw)] md:-translate-y-16 xl:-translate-y-24">
                        <Spot />
                        <Github />
                    </div>
                </QueryClientProvider>
            </div>
        </main>
    );
}

function Github() {
    const contributionQuery = useQuery({
        queryKey: ["github"],
        queryFn: async () =>
            await fetch("https://gh.finndore.dev/contributions/finndore").then(
                async (res) => {
                    const val = (await res.json()) as unknown as {
                        contributionCount: number;
                        date: string;
                    }[];
                    return val.splice(val.length - 42, val.length);
                },
            ),
        refetchInterval: 10000,
    });

    const { max, min } = useMemo(
        () =>
            contributionQuery.data?.reduce(
                (acc, day) => {
                    return {
                        max: Math.max(acc.max, day.contributionCount),
                        min: Math.min(acc.min, day.contributionCount),
                    };
                },
                { max: 0, min: Infinity },
            ) ?? { max: 0, min: 0 },
        [contributionQuery.data],
    );

    if (!contributionQuery.data) return null;

    return (
        <div className="flex-flex-col mt-auto p-4">
            <div className={ibm_plex_mono.className}>
                <div className={"mb-2 flex gap-3"}>
                    <picture className="my-auto ">
                        <img className="w-4" src="/pr.svg" alt="Github logo" />
                    </picture>
                    <div className="text-xs">
                        <h2 className="font-bold">
                            feat: updated the template
                        </h2>
                        <p>
                            finndore / <b>t3-starter</b>
                        </p>
                    </div>
                </div>
            </div>
            <div className=" flex max-h-16 flex-col flex-wrap">
                {contributionQuery.data.map((day) => {
                    const opacity = Math.max(
                        0.0,
                        (day.contributionCount - min) / (max - 3 - min),
                    );
                    return (
                        <div
                            key={day.date}
                            style={{
                                backgroundColor:
                                    opacity < 0.025
                                        ? "white"
                                        : `rgba(0, 0, 0, ${Math.max(opacity)})`,
                            }}
                            className="contribution-shaddow m-0.5 aspect-square w-4 rounded-sm bg-black"
                        ></div>
                    );
                })}
            </div>
        </div>
    );
}

function Spot() {
    const [isHovering, setIsHovering] = useState(false);
    const currentSongQuery = useQuery({
        queryKey: ["spot"],
        queryFn: async () => ({
            currentSong: await fetch("/api/spot").then(
                (res) => res.json() as unknown as CurrentSong,
            ),
            timestamp: new Date().getTime(),
        }),
        refetchInterval: 10000,
    });

    const topSongQuery = useQuery({
        queryKey: ["top-songs"],
        queryFn: async () =>
            await fetch("/api/top-songs").then(
                (res) => res.json() as unknown as Item[],
            ),
    });

    return (
        <div
            className="relative p-4"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {topSongQuery.data?.map((song, index) => (
                <TopSong
                    song={song}
                    index={index}
                    isHovering={isHovering}
                    key={song.name}
                />
            ))}
            {currentSongQuery.data && (
                <div className="relative z-10 flex">
                    <AlbumCover
                        album={currentSongQuery.data.currentSong.item.album}
                    />
                    <SongName song={currentSongQuery.data.currentSong.item} />
                </div>
            )}
        </div>
    );
}

function AlbumCover(props: { album: Album }) {
    return (
        <div className="relative aspect-square w-24">
            <div className=" absolute h-full w-full overflow-hidden rounded-2xl">
                <div className="noise h-full w-full"></div>
            </div>
            <picture>
                <img
                    className="album-shadow h-full w-full rounded-2xl border border-white/60"
                    src={props.album.images[0]?.url ?? "TODO"}
                    alt="TODO"
                />
            </picture>
        </div>
    );
}

const rotations = [6, -16, 20, 10];

function TopSong(props: { song: Item; index: number; isHovering: boolean }) {
    const spring = useSpring({
        to: props.isHovering
            ? {
                  translateY: `-${(props.index + 1) * 3.5}rem`,
                  zIndex: 9 - props.index,
              }
            : {
                  translateY: `0rem`,
                  zIndex: 9 - props.index,
              },
        config: config.gentle,
    });

    const rotationSpring = useSpring({
        rotate: props.isHovering ? rotations[props.index] : -(props.index * 8),
        config: config.gentle,
    });

    console.log(spring);
    return (
        <animated.div className="absolute flex" style={spring}>
            <animated.div style={rotationSpring}>
                <AlbumCover album={props.song.album} />
            </animated.div>
            <SongName
                song={props.song}
                small={true}
                className={clsx("transition-all", {
                    "opacity-0": !props.isHovering,
                    "opacity-100": props.isHovering,
                })}
            />
        </animated.div>
    );
}

function SongName(props: { song: Item; className?: string; small?: boolean }) {
    return (
        <div
            className={clsx(
                "ml-8 flex flex-col justify-center",
                props.className,
            )}
        >
            <a
                href={props.song.previewUrl}
                className={clsx("text-sm font-bold hover:underline", {
                    "text-xs": props.small,
                })}
            >
                {props.song.name}
            </a>
            <a
                href={props.song.artists[0]?.href}
                className="text-xs hover:underline"
            >
                {props.song.artists[0]?.name ?? "Unknown artist"}
            </a>
        </div>
    );
}
