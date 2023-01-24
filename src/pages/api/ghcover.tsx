/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';
import type { CurrentSong } from '../../_types/spotify';

export const config = {
    runtime: 'experimental-edge'
};

export default async function GithubCover() {
    const spotRes = await fetch('https://spot.finndore.dev', {});
    const currentSong = (await spotRes.json()) as CurrentSong | null;

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    position: 'relative'
                }}
            >
                <div
                    tw="absolute bottom-0 text-center text-black  right-0"
                    style={{
                        zIndex: 5
                    }}
                >
                    {currentSong?.item.name ?? 'Not playing'}
                </div>
                <img
                    style={{
                        zIndex: -10
                    }}
                    tw="w-full h-full absolute "
                    src={`http://localhost:3000/cover.png`}
                />
            </div>
        ),
        {
            width: 1512,
            height: 717
        }
    );
}
