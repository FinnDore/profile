import { useQuery, useQueryClient } from '@tanstack/react-query';
import { memo, useEffect, useState } from 'react';
import { useMobile } from '../hooks/is-mobile';

export const SpotifyStatus = () => {
    const { data } = useQuery({
        queryKey: ['spot'],
        queryFn: async () => ({
            currentSong: await fetch('/api/spot').then(
                res => res.json() as unknown as CurrentSong
            ),
            timestamp: new Date().getTime()
        }),
        refetchInterval: 10000
    });

    if (!data?.currentSong) return null;
    const item = data.currentSong.item;
    const sortedAlbumArt = item.album.images.sort((a, b) => a.width - b.width);

    return (
        <div className="spotify-status flex w-[100vw] rounded-md p-2 py-3 text-white sm:p-4">
            <a
                rel="noreferrer"
                target="_blank"
                href={item.external_urls.spotify}
                className="relative my-auto mr-4 w-20"
            >
                <picture>
                    <img
                        className="w-full rounded-md"
                        src={
                            sortedAlbumArt?.[2]?.url ??
                            sortedAlbumArt?.[1]?.url ??
                            sortedAlbumArt?.[0]?.url
                        }
                        alt={`Album art for ${item.album.name}`}
                    ></img>
                    <img
                        className="absolute top-0 z-[-1] w-full rounded-md blur-md"
                        src={sortedAlbumArt?.[0]?.url}
                        alt={`Album art for ${item.album.name}`}
                    ></img>
                </picture>
            </a>
            <div className="my-auto w-full">
                <a
                    rel="noreferrer"
                    target="_blank"
                    href={item.external_urls.spotify}
                    className="text-[.85rem] font-bold hover:underline hover:opacity-100"
                >
                    {item.name}
                </a>
                <div className="text-xs">
                    {item.artists.map((artist, i) => (
                        <span key={artist.name}>
                            <a
                                rel="noreferrer"
                                target="_blank"
                                className="text-white opacity-75 transition-colors hover:underline hover:opacity-100"
                                href={artist.external_urls.spotify}
                            >
                                {artist.name}
                            </a>
                            {i !== item.artists.length - 1 ? ', ' : ''}
                        </span>
                    ))}
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full">
                <ProgressBar
                    snapshotTime={data.timestamp}
                    paused={!data.currentSong.is_playing}
                    progress={data.currentSong.progress_ms}
                    duration={data.currentSong.item.duration_ms}
                />
            </div>
        </div>
    );
};

const ProgressBar = memo(function ProgressBar({
    paused,
    snapshotTime,
    progress,
    duration
}: {
    paused: boolean;
    snapshotTime: number;
    progress: number;
    duration: number;
}) {
    const [currentProgress, setCurrentProgress] = useState(progress);
    const queryClient = useQueryClient();

    const isMobile = useMobile();
    useEffect(() => {
        if (paused) return;

        let hasInvalidated = false;
        const interval = setInterval(
            () => {
                const currentTime = new Date().getTime();
                const timeSinceSnapshot = currentTime - snapshotTime;

                const newProgress = progress + timeSinceSnapshot;
                setCurrentProgress(newProgress);

                if ((newProgress / duration) * 100 >= 100 && !hasInvalidated) {
                    hasInvalidated = true;
                    queryClient.invalidateQueries(['spot']);
                }
            },
            isMobile ? 500 : 150
        );

        return () => {
            interval && clearInterval(interval);
        };
    }, [progress, snapshotTime, paused, duration, queryClient, isMobile]);

    const progressPercent = (currentProgress / duration) * 100;

    return (
        <div className="h-[.2rem] w-full rounded-full ">
            <div
                className="m-w-full h-full rounded-full bg-[#ff5119] transition-all"
                style={{
                    width: `${progressPercent > 100 ? 100 : progressPercent}%`
                }}
            ></div>
        </div>
    );
});

interface CurrentSong {
    progress_ms: number;
    timestamp: number;
    item: Item;
    is_playing: boolean;
}

interface Item {
    name: string;
    duration_ms: number;
    preview_url: string;
    album: Album;
    artists: Artist[];
    external_urls: ExternalUrls;
}

interface Album {
    album_type: string;
    artists: Artist[];
    external_urls: ExternalUrls;
    images: Image[];
    name: string;
    uri: string;
}

interface Artist {
    external_urls: ExternalUrls;
    href: string;
    name: string;
    uri: string;
}

interface ExternalUrls {
    spotify: string;
}

interface Image {
    height: number;
    url: string;
    width: number;
}
