import { useQuery } from '@tanstack/react-query';
import { memo, useEffect, useState } from 'react';

export const SpotifyStatus = () => {
    const { data: currentSong } = useQuery({
        queryKey: ['spot'],
        queryFn: () =>
            fetch('/api/spot').then(
                res => res.json() as unknown as CurrentSong
            ),
        refetchInterval: 5000
    });
    if (!currentSong) return null;
    const item = currentSong.item;
    const sortedAlbumArt = item.album.images.sort((a, b) => a.width - b.width);

    return (
        <div className="my-4 flex w-[300px] rounded-md border border-[#C9C9C9]/30 bg-black p-4 text-white">
            <picture className="my-auto mr-4 w-20">
                <img
                    className="w-full"
                    src={sortedAlbumArt?.[0]?.url}
                    alt={`Album art for ${item.album.name}`}
                ></img>
            </picture>
            <div className="w-full font-[.85rem]">
                <div>{item.name}</div>
                <div>
                    {item.artists.map((artist, i) => (
                        <span key={artist.name}>
                            <a
                                className="text-white underline hover:text-gray-400"
                                href={artist.external_urls.spotify}
                            >
                                {artist.name}
                            </a>
                            {i !== item.artists.length - 1 ? ', ' : ''}
                        </span>
                    ))}
                    <ProgressBar
                        snapshotTime={currentSong.timestamp}
                        progress={currentSong.progress_ms}
                        duration={currentSong.item.duration_ms}
                    />
                </div>
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
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [progress, snapshotTime]);

    const progressPercent = (currentProgress / duration) * 100;
    const progressDate = new Date(currentProgress);
    return (
        <div>
            <div className="h-1 w-full rounded-full bg-gray-300 pr-4">
                <div
                    className="m-w-full h-full rounded-full bg-[#ff5119]"
                    style={{ width: `${progressPercent}%` }}
                ></div>
            </div>
            <div className="text-xs">{`${progressDate.getMinutes()}:${progressDate.getSeconds()}`}</div>
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
