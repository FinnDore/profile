import { animated, useSpring } from '@react-spring/web';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';
import { useMobile } from '../hooks/is-mobile';
import type { CurrentSong, Item } from '../_types/spotify';
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
    const [isHovering, setIsHovering] = useState(false);

    if (!data?.currentSong) return null;

    return (
        <div className="spotify-status flex w-[100vw] rounded-md p-2 py-3 text-white">
            {/* <TopSongs isHovering={isHovering} /> */}

            <div
                className={clsx(
                    'transition-colors border border-transparent rounded-lg ',
                    {
                        'bg-black/50 backdrop-blur-sm  w-min !border-[#C9C9C9]/30 ':
                            isHovering
                    }
                )}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <Song song={data.currentSong.item} />
            </div>
            <div className="absolute bottom-0 left-0 w-full ">
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

const TopSongs = memo(function TopSongs({
    isHovering
}: {
    isHovering: boolean;
}) {
    const { data } = useQuery({
        queryKey: ['top-songs'],
        queryFn: async () =>
            await fetch('/api/top-songs').then(
                res => res.json() as unknown as Item[]
            )
    });

    const spring = useSpring({
        to: isHovering
            ? { opacity: 1, transform: 'translateY(-100%)' }
            : { opacity: 0, transform: 'translateY(0%)' }
    });

    if (!data) return null;
    return (
        <animated.div style={spring} className="absolute flex-col">
            {data.map(song => (
                <Song key={song.name} song={song} />
            ))}
        </animated.div>
    );
});

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
            isMobile ? 1000 : 200
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

const Song = ({ song }: { song: Item }) => {
    const sortedAlbumArt = song.album.images.sort((a, b) => a.width - b.width);

    return (
        <div className="spotify-status flex rounded-md text-white sm:p-4 w-max">
            <a
                rel="noreferrer"
                target="_blank"
                href={song.external_urls.spotify}
                className="relative my-auto mr-4 w-28"
            >
                <picture>
                    <img
                        className="w-full rounded-md"
                        src={
                            sortedAlbumArt?.[2]?.url ??
                            sortedAlbumArt?.[1]?.url ??
                            sortedAlbumArt?.[0]?.url
                        }
                        alt={`Album art for ${song.album.name}`}
                    ></img>
                    <img
                        className="absolute top-0 z-[-1] w-full rounded-md blur-md"
                        src={sortedAlbumArt?.[0]?.url}
                        alt={`Album art for ${song.album.name}`}
                    ></img>
                </picture>
            </a>
            <div className="my-auto w-full">
                <a
                    rel="noreferrer"
                    target="_blank"
                    href={song.external_urls.spotify}
                    className="text-[.85rem] font-bold hover:underline hover:opacity-100"
                >
                    {song.name}
                </a>
                <div className="text-xs">
                    {song.artists.map((artist, i) => (
                        <span key={artist.name}>
                            <a
                                rel="noreferrer"
                                target="_blank"
                                className="text-white opacity-75 transition-colors hover:underline hover:opacity-100"
                                href={artist.external_urls.spotify}
                            >
                                {artist.name}
                            </a>
                            {i !== song.artists.length - 1 ? ', ' : ''}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};
