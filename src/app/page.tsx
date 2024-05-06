'use client';
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query';
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
        <div className="relative z-10">
            {topSongQuery.data?.map((song, i) => (
                <div
                    className="absolute"
                    key={song.name}
                    style={{
                        transform: `rotate(-${i * 10}deg)`,
                        zIndex: 10 - i,
                    }}
                >
                    <AlbumCover album={song.album} />
                </div>
            ))}
            {currentSongQuery.data && (
                <AlbumCover
                    album={currentSongQuery.data.currentSong.item.album}
                />
            )}
        </div>
    );
}

function AlbumCover(props: { album: Album }) {
    return (
        <div>
            <picture>
                <img
                    className="w-24 aspect-square rounded-2xl border border-white/60 album-shadow"
                    src={props.album.images[0]!.url}
                    alt="TODO"
                />
            </picture>
        </div>
    );
}
