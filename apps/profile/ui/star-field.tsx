/* eslint-disable @next/next/no-img-element */
import { ParallaxLayer } from '@react-spring/parallax';
import { random } from 'lodash';

function Star({
    props: { x, y, scale, z, blur }
}: {
    props: {
        x: number;
        y: number;
        z: number;
        scale: number;
        blur: number;
        color?: string;
    };
}) {
    return (
        <img
            className="absolute"
            src="/star.svg"
            alt="shiny shiny"
            style={{
                transform: `translate(${x}vw, ${y}vh) scale(${scale})`,
                zIndex: z,
                filter: `blur(${blur}px)`,
                height: '20px',
                width: '20px'
            }}
        />
    );
}

export function StarField() {
    const stars = [];
    const maxY = 200;
    for (let i = 0; i < random(75, 100); i++) {
        stars.push(
            <ParallaxLayer offset={0} speed={random(1, 5)}>
                <Star
                    key={i}
                    props={{
                        x: random(0, 100),
                        y: random(0, maxY),
                        z: random(0, 100),
                        scale: random(0.75, 1.5),
                        blur: random(1, 5)
                    }}
                />
            </ParallaxLayer>
        );
    }
    return <>{stars}</>;
}
