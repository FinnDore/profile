import { useQuery } from '@tanstack/react-query';
import { memo, useEffect, useState } from 'react';

export const SpotifyStatus = () => {
    const { data } = useQuery({
        queryKey: ['spot'],
        queryFn: async () => ({
            currentSong: await fetch('/api/spot').then(
                res => res.json() as unknown as CurrentSong
            ),
            timestamp: new Date().getTime()
        }),
        refetchInterval: 5000
    });
    if (!data?.currentSong) return null;
    const item = data.currentSong.item;
    const sortedAlbumArt = item.album.images.sort((a, b) => a.width - b.width);

    return (
        <div className="flex w-[100vw] rounded-md p-4 text-white">
            <picture className="my-auto mr-4 w-20">
                <img
                    className="w-full"
                    src={sortedAlbumArt?.[0]?.url}
                    alt={`Album art for ${item.album.name}`}
                ></img>
            </picture>
            <div className="my-auto w-full">
                <div className="text-[.85rem] font-bold  hover:underline hover:opacity-100">
                    {item.name}
                </div>
                <div className="text-xs">
                    {item.artists.map((artist, i) => (
                        <span key={artist.name}>
                            <a
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
                    progress={data.currentSong.progress_ms}
                    duration={data.currentSong.item.duration_ms}
                />
            </div>
        </div>
    );
};

const ProgressBar = memo(function ProgressBar({
    snapshotTime,
    progress,
    duration
}: {
    snapshotTime: number;
    progress: number;
    duration: number;
}) {
    const [currentProgress, setCurrentProgress] = useState(progress);
    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date().getTime();
            const timeSinceSnapshot = currentTime - snapshotTime;
            console.log(timeSinceSnapshot);

            const newProgress = progress + timeSinceSnapshot;
            setCurrentProgress(newProgress);
        }, 150);

        return () => {
            clearInterval(interval);
        };
    }, [progress, snapshotTime]);

    const progressPercent = (currentProgress / duration) * 100;
    // const progressDate = new Date(currentProgress
    //{/* <div className="text-xs">{`${progressDate.getMinutes()}:${progressDate.getSeconds()}`}</div> */}
    return (
        <div className="h-[.2rem] w-full rounded-full ">
            <div
                className="m-w-full h-full rounded-full bg-[#ff5119] transition-all"
                style={{ width: `${progressPercent}%` }}
            ></div>
        </div>
    );
});
interface CurrentSong {
    progress_ms: number;
    timestamp: number;
    item: Item;
}

interface Item {
    name: string;
    duration_ms: number;
    preview_url: string;
    album: Album;
    artists: Artist[];
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
