"use client";
import { animated, config, useSpring } from "@react-spring/web";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";
import { useDebounceFunction } from "../../hooks/debounce-function";
import type { Album, CurrentSong, Item } from "../../_types/spotify";

export function Spotify() {
    const [isHovering, setIsHovering] = useState(false);
    const debouncedSetIsHovering = useDebounceFunction(setIsHovering);
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
            onMouseEnter={() => debouncedSetIsHovering(true)}
            onMouseLeave={() => debouncedSetIsHovering(false)}
        >
            {topSongQuery.data?.map((song, index) => (
                <TopSong
                    song={song}
                    index={index}
                    isHovering={isHovering}
                    key={song.name + index}
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
            <div className="absolute h-full w-full overflow-hidden rounded-2xl">
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

    return (
        <animated.div
            className={clsx("absolute flex", {
                "pointer-events-none": !props.isHovering,
            })}
            style={spring}
        >
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
                href={props.song.externalUrls.spotify}
                className={clsx("text-sm font-bold hover:underline", {
                    "text-xs": props.small,
                })}
            >
                {props.song.name}
            </a>
            <a
                href={props.song.artists[0]?.externalUrls.spotify}
                className="text-xs hover:underline"
            >
                {props.song.artists[0]?.name ?? "Unknown artist"}
            </a>
        </div>
    );
}
