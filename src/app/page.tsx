'use client';
import { animated, config, useSpring } from '@react-spring/web';
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query';
import { useState } from 'react';
import type { Album, CurrentSong, Item } from '../_types/spotify';

const queryClient = new QueryClient();

/* eslint-disable @next/next/no-img-element */
export default function Page() {
    return (
        <main className="h-screen bg-white flex flex-col">
            <img
                className="m-auto md:hidden max-h-[70vh] relative aspect-auto"
                src="/finn-sm.webp"
                alt="Picture with the text 'finn'"
            />
            <img
                className="mx-auto md:block hidden max-w-[clamp(80vw,75rem,90vw)] relative aspect-auto"
                src="/finn.webp"
                alt="Picture with the text 'finn'"
            />
            <div className="grid place-items-center">
                <QueryClientProvider client={queryClient}>
                    <Spot />
                </QueryClientProvider>
            </div>
        </main>
    );
}

export function Spot() {
    const [isHovering, setIsHovering] = useState(false);
    const currentSongQuery = useQuery({
        queryKey: ['spot'],
        queryFn: async () => ({
            currentSong: await fetch('/api/spot').then(
                (res) => res.json() as unknown as CurrentSong
            ),
            timestamp: new Date().getTime(),
        }),
        refetchInterval: 10000,
    });

    const topSongQuery = useQuery({
        queryKey: ['top-songs'],
        queryFn: async () =>
            await fetch('/api/top-songs').then(
                (res) => res.json() as unknown as Item[]
            ),
    });

    console.log(topSongQuery.data);
    return (
        <div
            className="relative"
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
                <div className="z-10 relative flex">
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
            <div className=" w-full h-full overflow-hidden absolute rounded-2xl">
                <div className="w-full h-full noise"></div>
            </div>
            <picture>
                <img
                    className="w-full h-full rounded-2xl border border-white/60 album-shadow"
                    src={props.album.images[0]!.url}
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
                  translateY: `-${(props.index + 1) * 3.2}rem`,
                  rotate: rotations[props.index],
                  zIndex: 9 - props.index,
              }
            : {
                  translateY: `0rem`,
                  rotate: -(props.index * 8),
                  zIndex: 9 - props.index,
              },
        config: config.gentle,
    });
    console.log(spring);
    return (
        <animated.div className="absolute" style={spring}>
            <AlbumCover album={props.song.album} />
        </animated.div>
    );
}

function SongName(props: { song: Item }) {
    return (
        <div className="flex flex-col justify-center ml-8">
            <p className="text-lg font-bold">{props.song.name}</p>
            <p className="text-sm">
                {props.song.artists[0]?.name ?? 'Unknown artist'}
            </p>
        </div>
    );
}
