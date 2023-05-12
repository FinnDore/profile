import { Separator } from '@radix-ui/react-separator';
import { animated, config, useSpring } from '@react-spring/web';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';
import type { CurrentSong, Item } from '../_types/spotify';
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
    const [isHovering, setIsHovering] = useState(false);

    const spring = useSpring({
        to: isHovering
            ? {
                  opacity: 1,
                  transform: 'translateY(0%)',
                  borderColor: 'rgba(201, 201, 201, 0.3)'
              }
            : {
                  opacity: 0,
                  transform: 'translateY(10%)',
                  borderColor: 'transparent'
              },
        config: config.stiff
    });

    const spring2 = useSpring({
        to: isHovering
            ? {
                  opacity: 1,
                  transform: 'translateY(0%)'
              }
            : {
                  opacity: 0,
                  transform: 'translateY(10%)'
              },
        config: config.stiff
    });

    if (!data?.currentSong) return null;

    return (
        <div className="spotify-status flex w-[calc(100vw-.5rem)] max-w-[calc(100vw-0.5rem)] flex-col rounded-md pointer-events-none text-white">
            <div
                className="pointer-events-auto relative w-max max-w-full mx-1 my-2 px-1 py-1 sm:p-0"
                onMouseLeave={() => setIsHovering(false)}
            >
                <animated.div
                    style={spring2}
                    className={clsx({
                        'pointer-events-none': !isHovering
                    })}
                >
                    <h2 className="px-2 sm:px-4 uppercase font-bold text-xs pt-1 sm:pt-4">
                        My top songs:
                    </h2>

                    <TopSongs />
                    <Separator className="mx-4 sm:mx-8 bg-[#C9C9C9]/20 h-0.5 my-3 rounded " />

                    <h2 className="sm:px-4 px-2 uppercase font-bold text-xs">
                        Currently playing:
                    </h2>
                </animated.div>

                <div onMouseEnter={() => setIsHovering(true)}>
                    <Song song={data.currentSong.item} />
                </div>

                <animated.div
                    style={spring}
                    className="min-w-[250px] backdrop-blur-sm rounded-lg bg-black/50 border absolute w-full h-full top-0 -z-10 bg-blend-difference"
                ></animated.div>
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

const TopSongs = memo(function TopSongs() {
    const { data } = useQuery({
        queryKey: ['top-songs'],
        queryFn: async () =>
            await fetch('/api/top-songs').then(
                res => res.json() as unknown as Item[]
            )
    });

    if (!data) return null;
    return (
        <animated.div className="flex-col">
            {data.map(song => (
                <Song key={song.name} song={song} small={true} />
            ))}
        </animated.div>
    );
});

const Song = ({ song, small }: { song: Item; small?: boolean }) => {
    const sortedAlbumArt = song.album.images.sort((a, b) => a.width - b.width);

    return (
        <div
            className={clsx(
                'spotify-status flex rounded-md text-white px-2 py-1 sm:p-4',
                {
                    'sm:py-2': small
                }
            )}
        >
            <a
                rel="noreferrer"
                target="_blank"
                href={song.external_urls.spotify}
                className={clsx('relative my-auto mr-4', {
                    'w-[5rem] min-w-[5rem]': !small,
                    'w-[3.5rem] min-w-[3.5rem]': small
                })}
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
                    className={clsx(
                        'text-[.85rem] font-bold hover:underline hover:opacity-100',
                        {
                            'text-[.7rem]': small
                        }
                    )}
                >
                    {song.name}
                </a>
                <div className="text-xs">
                    {song.artists.map((artist, i) => (
                        <span key={artist.name}>
                            <a
                                rel="noreferrer"
                                target="_blank"
                                className={clsx(
                                    'text-white opacity-75 transition-colors hover:underline hover:opacity-100',
                                    {
                                        'text-[.7rem]': small
                                    }
                                )}
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
        <div className="h-[.2rem] w-full rounded-full">
            <div
                className="m-w-full h-full rounded-full bg-[#ff5119] transition-all"
                style={{
                    width: `${progressPercent > 100 ? 100 : progressPercent}%`
                }}
            ></div>
        </div>
    );
});
