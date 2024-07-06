"use client";
import { animated, config, useSpring } from "@react-spring/web";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { useDebounceFunction } from "../../hooks/debounce-function";
import type { Album, CurrentSong, Item } from "../../_types/spotify";

function useTopSongs(limit = 4) {
    const query = new URLSearchParams({ limit: limit.toString() });
    return useQuery({
        queryKey: ["top-songs", limit],
        queryFn: async () =>
            await fetch("https://spot.finndore.dev/top-songs?" + query).then(
                (res) => res.json() as unknown as Item[],
            ),
    });
}

export function Spotify() {
    const [isHovering, setIsHovering] = useState(false);
    const debouncedSetIsHovering = useDebounceFunction(setIsHovering);
    const currentSongQuery = useQuery({
        queryKey: ["spot"],
        queryFn: async () => ({
            currentSong: await fetch("https://spot.finndore.dev").then(
                (res) => res.json() as unknown as CurrentSong | undefined,
            ),
            timestamp: new Date().getTime(),
        }),
        refetchInterval: 10000,
    });

    const topSongQuery = useTopSongs();

    const { currentSong, topSongs } = useMemo(() => {
        if (!topSongQuery.data) return {};
        if (!currentSongQuery.data?.currentSong) {
            const [current, ...top] = topSongQuery.data;
            return {
                currentSong: current,
                topSongs: top,
            };
        }
        return {
            currentSong: currentSongQuery.data.currentSong.item,
            topSongs: topSongQuery.data,
        };
    }, [currentSongQuery.data, topSongQuery.data]);

    return (
        <div
            className="relative p-4"
            onMouseEnter={() => debouncedSetIsHovering(true)}
            onMouseLeave={() => debouncedSetIsHovering(false)}
        >
            {topSongs?.map((song, index) => (
                <TopSong
                    song={song}
                    index={index}
                    isHovering={isHovering}
                    key={song.name + index}
                />
            ))}
            {currentSong && (
                <div className="relative z-10 flex">
                    <AlbumCover album={currentSong.album} />
                    <SongName song={currentSong} />
                </div>
            )}
        </div>
    );
}

function AlbumCover(props: { album: Album; small?: boolean }) {
    const roundedClass = props.small ? "rounded-md" : "rounded-2xl";
    return (
        <div
            className={clsx("relative aspect-square", {
                "w-24 min-w-24": !props.small,
                "w-8 min-w-8": props.small,
            })}
        >
            <div
                className={clsx(
                    "absolute h-full w-full overflow-hidden rounded-2xl",
                    roundedClass,
                )}
            >
                <div className="noise h-full w-full"></div>
            </div>
            <picture>
                <img
                    className={clsx(
                        "album-shadow h-full w-full border ",
                        {
                            "border-white/60": !props.small,
                            "border-transparent": props.small,
                        },
                        roundedClass,
                    )}
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
                className={clsx("shadow-text transition-all", {
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

export function SpotifyBento() {
    const topSongQuery = useTopSongs(20);
    return (
        <div className="flex flex-col gap-4">
            <div className="flex max-h-32 flex-col gap-2 overflow-auto px-6 pb-6">
                {topSongQuery.data?.map((song) => (
                    <div className="flex" key={song.name}>
                        <AlbumCover
                            key={song.name}
                            album={song.album}
                            small={true}
                        />
                        <div className="my-auto ml-4 flex justify-center gap-2">
                            <a
                                href={song.externalUrls.spotify}
                                className="text-xs font-bold hover:underline"
                            >
                                {song.name}
                            </a>
                            <a
                                href={song.artists[0]?.externalUrls.spotify}
                                className="text-xs hover:underline"
                            >
                                {song.artists[0]?.name ?? "Unknown artist"}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
