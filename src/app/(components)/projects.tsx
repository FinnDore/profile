/* eslint-disable @next/next/no-img-element */
import {
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
    ExternalLinkIcon,
} from "@radix-ui/react-icons";
import { animated, config, useInView, useSpring } from "@react-spring/web";
import { clsx } from "clsx";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { Arc } from "./arc";
import { Glitch } from "./glitch";
import { Label } from "./label";
import { Location } from "./location";
import { Spotify } from "./spotify";

const LocationDescription = dynamic(
    () =>
        import("./location-description").then((mod) => mod.LocationDescription),
    { ssr: false },
);

const Tab = {
    Vote: "Vote",
    One: "One",
    Spotify: "Spotify",
    Location: "Location",
};

type Tab = (typeof Tab)[keyof typeof Tab];

function NextButton(props: {
    onClick?: () => void;
    ariaLabel: string;
    children: React.ReactNode;
}) {
    return (
        <button
            aria-label={props.ariaLabel}
            className="group relative transform rounded-md border border-black/20 bg-white p-3 shadow-md transition-all ease-in-out hover:border-black/50 hover:shadow-lg active:scale-90"
            onClick={() => props.onClick?.()}
        >
            <div className="absolute left-0 top-0 h-full w-full shadow-inner"></div>
            <div className="opacity-50 transition-opacity group-hover:opacity-100 ">
                {props.children}
            </div>
        </button>
    );
}

function Progress(props: { pause: boolean; next: (auto?: boolean) => void }) {
    return (
        <div className="h-1 w-full overflow-hidden rounded-md bg-black/10 opacity-35 ">
            <div
                style={{
                    animationPlayState: props.pause ? "paused" : "running",
                }}
                onAnimationIteration={() => props.next(true)}
                className="progress-bar h-full w-full rounded-md bg-black/50 transition-all"
            ></div>
        </div>
    );
}

function Description(props: {
    children: React.ReactNode;
    hidden?: boolean;
    title: React.ReactNode;
    link: { url: string; name: string };
    description: React.ReactNode;
}) {
    return (
        <div
            className={clsx({
                hidden: props.hidden,
            })}
        >
            <div className="flex gap-4">
                <h1 className="text-xl font-bold xxs:text-2xl">
                    {props.title}
                </h1>
                <a
                    href={props.link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="my-auto flex gap-1 text-sm text-gray-500 underline hover:text-black"
                >
                    {props.link.name}
                    <ExternalLinkIcon className="my-auto scale-75" />
                </a>
            </div>

            <p className="lg:m-w-96 w-full max-w-[80vw] justify-evenly pt-1 text-justify text-sm xxs:text-base sm:max-w-md md:max-w-md lg:text-start">
                {props.description}
            </p>
            {!props.hidden && (
                <div className="my-3 flex flex-nowrap gap-2">
                    {props.children}
                </div>
            )}
        </div>
    );
}

export function Projects() {
    const [tab, setTab] = useState<Tab>(Tab.Vote);
    const [pause, setPause] = useState(true);
    const [reverse, setReverse] = useState(false);

    const pauseTimeout = useRef<NodeJS.Timeout | null>(null);

    const location = tab === Tab.Location;
    const spot = tab === Tab.Spotify || location;
    const one = tab === Tab.One || spot;

    const oneSpring = useSpring({
        scale: one ? 1 : 0.9,
        rotate: one ? -4 : 0,
        trnaslateY: one ? 0 : 20,
        config: config.wobbly,
    });
    const spotSpring = useSpring({
        scale: spot ? 1 : 0.9,
        rotate: spot ? 4 : 0,
        trnaslateY: spot ? 0 : 20,
        config: config.wobbly,
    });
    const locationSpring = useSpring({
        scale: location ? 1 : 0.9,
        rotate: location ? -3 : 0,
        trnaslateY: location ? 0 : 20,
        config: config.wobbly,
    });

    const { next, prev } = useMemo(() => {
        const tabs = Object.values(Tab);
        const index = tabs.indexOf(tab);
        const resetTimer = () => {
            if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
            setPause(true);
            pauseTimeout.current = setTimeout(() => setPause(false), 15000);
        };
        return {
            next: (auto?: boolean) => {
                if (!auto) {
                    resetTimer();
                }
                if (index + 1 === tabs.length - 1) {
                    setReverse(true);
                }
                setTab(tabs[index + 1] ?? tabs[tabs.length - 1] ?? Tab.Vote);
            },
            prev: (auto?: boolean) => {
                if (!auto) {
                    resetTimer();
                }
                if (index === 1) {
                    setReverse(false);
                }
                setTab(tabs[index - 1] ?? tabs[0] ?? Tab.Vote);
            },
        };
    }, [tab, setTab, setReverse, setPause]);

    const [ref, inview] = useInView({
        once: true,
        amount: 0.5,
    });

    useEffect(() => {
        if (inview) {
            setPause(false);
        }
    }, [inview]);

    return (
        <div
            ref={ref}
            className="z-20 mx-auto flex w-full max-w-6xl flex-col gap-6 pb-6 md:pb-8 lg:gap-12"
        >
            <div className="mx-auto flex flex-col gap-6 xxs:gap-8 lg:flex-row">
                <div className="relative mx-auto max-w-[80vw] sm:max-w-md md:max-w-md xl:max-w-xl 2xl:max-w-2xl">
                    <Arc className="mt-6 lg:mt-0">
                        <picture className="absolute aspect-[2710/1800] w-full">
                            <img
                                src="/projects/vote/landing.webp"
                                alt="Vote"
                                className="rounded-md"
                            />
                        </picture>
                        <video
                            src="/projects/vote/landing.mp4"
                            controls={false}
                            autoPlay
                            loop
                            muted
                            className="relative aspect-[2710/1800] w-full rounded-md"
                        ></video>
                    </Arc>

                    <animated.div
                        style={oneSpring}
                        className={clsx(
                            "absolute top-0 w-full transition-opacity duration-200",
                            {
                                "pointer-events-none opacity-0": !one,
                                "opacity-100": one,
                            },
                        )}
                    >
                        <Arc>
                            <picture className="aspect-[2984/2050] w-full rounded-md invert">
                                <img src="/projects/one/one.png" alt="Vote" />
                            </picture>
                        </Arc>
                    </animated.div>

                    <animated.div
                        style={spotSpring}
                        className={clsx(
                            "absolute top-0 h-full w-full transition-opacity duration-200",
                            {
                                "pointer-events-none opacity-0": !spot,
                                "opacity-100": spot,
                            },
                        )}
                    >
                        <Arc className="h-full">
                            <div className="grid h-full place-content-center rounded-md">
                                <Spotify />
                            </div>
                        </Arc>
                    </animated.div>
                    <animated.div
                        style={locationSpring}
                        className={clsx(
                            "absolute top-0 h-full w-full transition-opacity duration-200",
                            {
                                "pointer-events-none opacity-0": !location,
                                "opacity-100": location,
                            },
                        )}
                    >
                        <Arc className="h-full">
                            <div className="grid h-full place-content-center rounded-md">
                                <div className="map-gradient2 absolute z-10 h-full w-full rounded-md"></div>
                                <Location hideWeather />
                            </div>
                        </Arc>
                    </animated.div>
                </div>
                <div className="h-52 px-6 xxs:h-48 xxs:px-0">
                    <Description
                        hidden={tab !== Tab.Vote}
                        title={
                            <div className="flex">
                                <b>V</b>
                                <Glitch text="ote" />
                            </div>
                        }
                        link={{
                            url: "https://v.finndore.dev",
                            name: "v.finndore.dev",
                        }}
                        description={
                            <>
                                Vote is a pointing poker website that allows
                                people to vote on how many story points a
                                story/task should be given. Features include
                                anonymus accounts to allow for frictitonless
                                voting along with the use of websockets to allow
                                for real time updates.{" "}
                                <i>
                                    <a
                                        className="text-xs underline opacity-35 blur-sm transition-all hover:opacity-100 hover:blur-none"
                                        href="https://v.finndore.dev"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        (Try the vote on the front page!)
                                    </a>
                                </i>
                            </>
                        }
                    >
                        <Label
                            bgColor="bg-[#00003d31]"
                            bgGlow="bg-[radial-gradient(#00003d_0%,transparent_70%)]"
                            name="Next.js"
                            link="https://nextjs.org"
                            className="cursor-pointer"
                            smallRound
                        />
                        <Label
                            bgColor="bg-[#0ca5e931]"
                            bgGlow="bg-[radial-gradient(#0ca55e_0%,transparent_70%)]"
                            name="Tailwind"
                            link="https://tailwindcss.com"
                            className="cursor-pointer"
                            smallRound
                        />
                        <Label
                            bgColor="bg-[#f1672631]"
                            bgGlow="bg-[radial-gradient(#f16726_0%,transparent_70%)]"
                            name="Vitess"
                            link="https://vitess.io"
                            className="cursor-pointer"
                            smallRound
                        />
                        <Label
                            bgColor="bg-[#ef444431]"
                            bgGlow="bg-[radial-gradient(#ef4444_0%,transparent_70%)]"
                            name="Tanstack Query"
                            link="https://tanstack.com/query/v3"
                            className="cursor-pointer"
                            smallRound
                        />
                    </Description>
                    <Description
                        hidden={tab !== Tab.One}
                        title="One"
                        link={{
                            url: "https://github.com/finndore/one",
                            name: "finndore/one",
                        }}
                        description={
                            <>
                                <span>
                                    One is an IOT light written in embeded Rust
                                    using embassy that runs on a
                                </span>

                                <a
                                    href="https://www.raspberrypi.com/documentation/microcontrollers/raspberry-pi-pico.html"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="relative inline-block h-5 w-10 px-2 align-middle  drop-shadow-xl transition-all hover:scale-110"
                                >
                                    <img
                                        src="/projects/one/pie.webp"
                                        className="center-absolute inline h-8 w-8"
                                        alt="Rasberry Pie logo"
                                    />
                                </a>
                                <span>
                                    Pico W. It comes with an installable
                                    companion app made with Tauri and Next.js
                                    that can control the light via WIFI.
                                </span>
                            </>
                        }
                    >
                        <Label
                            bgColor="bg-[#67d6ed61]"
                            bgGlow="bg-[radial-gradient(#67d6ed_0%,transparent_70%)]"
                            name="Tauri"
                            link="https://tauri.app"
                            className="cursor-pointer"
                            smallRound
                        />
                        <Label
                            bgColor="bg-[#00a63331]"
                            bgGlow="bg-[radial-gradient(#00a633_0%,transparent_70%)]"
                            name="Embassy"
                            link="https://embassy.dev/"
                            className="cursor-pointer"
                            smallRound
                        />
                        <Label
                            bgColor="bg-[#f1672631]"
                            bgGlow="bg-[radial-gradient(#f16726_0%,transparent_70%)]"
                            name="Rust"
                            link="https://www.rust-lang.org"
                            className="cursor-pointer"
                            smallRound
                        />
                        <Label
                            bgColor="bg-[#00003d31]"
                            bgGlow="bg-[radial-gradient(#00003d_0%,transparent_70%)]"
                            name="Next.js"
                            link="https://nextjs.org"
                            className="cursor-pointer"
                            smallRound
                        />
                    </Description>
                    <Description
                        title="Spot"
                        hidden={tab !== Tab.Spotify}
                        link={{
                            url: "https://github.com/finndore/spot",
                            name: "finndore/spot",
                        }}
                        description="Spot is a spotify api wrapper built to serve top songs and current song data for a given spotify account. Spot also allows control of the currently playing song and is currently powering the music section of this website."
                    >
                        <Label
                            bgColor="bg-[#f1672631]"
                            bgGlow="bg-[radial-gradient(#f16726_0%,transparent_70%)]"
                            name="Rust"
                            link="https://www.rust-lang.org"
                            className="cursor-pointer"
                            smallRound
                        />
                        <Label
                            bgColor="bg-[#5048e631]"
                            bgGlow="bg-[radial-gradient(#5048e6_0%,transparent_70%)]"
                            name="Axum"
                            link="https://github.com/tokio-rs/axum"
                            className="cursor-pointer"
                            smallRound
                        />
                    </Description>
                    <Description
                        title="Location"
                        hidden={tab !== Tab.Location}
                        link={{
                            url: "https://github.com/finndore/location",
                            name: "finndore/location",
                        }}
                        description={
                            <>
                                A simple location api that returns my location
                                and weather for that location.{" "}
                                <LocationDescription />
                            </>
                        }
                    >
                        <Label
                            bgColor="bg-[#f1672631]"
                            bgGlow="bg-[radial-gradient(#f16726_0%,transparent_70%)]"
                            name="Rust"
                            link="https://www.rust-lang.org"
                            className="cursor-pointer"
                            smallRound
                        />
                        <Label
                            bgColor="bg-[#5048e631]"
                            bgGlow="bg-[radial-gradient(#5048e6_0%,transparent_70%)]"
                            name="Axum"
                            link="https://github.com/tokio-rs/axum"
                            className="cursor-pointer"
                            smallRound
                        />
                    </Description>
                </div>
            </div>
            <div className="mx-auto flex flex-col gap-4 lg:mt-4">
                <div className="flex gap-4">
                    <NextButton onClick={() => prev()} ariaLabel="next project">
                        <DoubleArrowLeftIcon className="scale-125" />
                    </NextButton>
                    <NextButton
                        onClick={() => next()}
                        ariaLabel="previous project"
                    >
                        <DoubleArrowRightIcon className="scale-125" />
                    </NextButton>
                </div>
                <Progress pause={pause} next={reverse ? prev : next} />
            </div>
        </div>
    );
}
