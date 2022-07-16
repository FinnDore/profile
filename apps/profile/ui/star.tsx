/* eslint-disable @next/next/no-img-element */
import { ParallaxLayer } from '@react-spring/parallax';
import { random } from 'lodash-es';
import { useEffect, useState } from 'react';

export interface StarOpts {
    x: number;
    y: number;
    z: number;
    scale: number;
    blur: number;
    hue: number;
    saturation: number;
    color?: string;
    speed: number;
}
const maxY = 150;
export default function Star() {
    const [starOpts, SetStarOpts] = useState<StarOpts>(null);
    useEffect(() => {
        SetStarOpts({
            x: random(0, 100),
            y: random(0, maxY),
            z: random(0, 100),
            scale: random(0.75, 1.5),
            blur: random(1, 5),
            hue: random(0, 360 / 4),
            saturation: random(0, 90),
            speed: random(1, 5)
        });

        return () => {
            SetStarOpts(null);
        };
    }, []);

    return (
        starOpts && (
            <ParallaxLayer offset={0} speed={starOpts.speed}>
                <img
                    className="absolute"
                    src="/star.svg"
                    alt="shiny shiny"
                    style={{
                        transform: `translate(${starOpts.x}vw, ${starOpts.y}vh) scale(${starOpts.scale})`,
                        zIndex: starOpts.z,
                        filter: `blur(${starOpts.blur}px) hue-rotate(${starOpts.hue}deg) saturate(${starOpts.saturation}%)`,
                        height: '20px',
                        width: '20px'
                    }}
                />
            </ParallaxLayer>
        )
    );
}
