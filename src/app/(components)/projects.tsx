import {
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
    ExternalLinkIcon,
} from "@radix-ui/react-icons";
import { animated, config, useInView, useSpring } from "@react-spring/web";
import { clsx } from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { Arc } from "./arc";
import { Glitch } from "./glitch";
import { Label } from "./label";
import { Location } from "./location";
import { Spotify } from "./spotify";

const Tab = {
    Vote: "Vote",
    One: "One",
    Spotify: "Spotify",
    Location: "Location",
};

type Tab = (typeof Tab)[keyof typeof Tab];

function NextButton(props: {
    onClick?: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
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
    title: React.ReactNode;
    link: { url: string; name: string };
    description: string;
}) {
    return (
        <div>
            <div className="flex gap-4">
                <h1 className="text-xl font-bold xxs:text-2xl">
                    {props.title}
                </h1>
                <a
                    href={props.link.url}
                    className="my-auto flex gap-1 text-sm text-gray-500 underline hover:text-black"
                >
                    {props.link.name}
                    <ExternalLinkIcon className="my-auto scale-75" />
                </a>
            </div>

            <p className="max-w-96 pt-1 text-sm xxs:text-base">
                {props.description}
            </p>
            <div className="my-2.5 flex flex-nowrap gap-2">
                {props.children}
            </div>
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
            className="z-20 mx-auto flex w-full max-w-6xl flex-col gap-6 pb-6 md:pb-8 lg:gap-16"
        >
            <div className="mx-auto flex flex-col gap-6 xxs:gap-8 lg:flex-row">
                <div className="relative mx-auto max-w-[80vw] sm:max-w-md">
                    <Arc className="mt-14 lg:mt-0">
                        <picture className="w-full">
                            <img
                                src="/projects/vote/landing-crop.png"
                                alt="Vote"
                                className="rounded-md"
                            />
                        </picture>
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
                            <picture className="w-full rounded-md invert">
                                <img src="/projects/light-2.png" alt="Vote" />
                            </picture>
                        </Arc>
                    </animated.div>

                    <animated.div
                        style={spotSpring}
                        className={clsx(
                            "absolute top-0 w-full transition-opacity duration-200",
                            {
                                "pointer-events-none opacity-0": !spot,
                                "opacity-100": spot,
                            },
                        )}
                    >
                        <Arc className="h-60 w-full xxs:h-72 sm:h-80">
                            <div className="grid h-full place-content-center rounded-md">
                                <Spotify />
                            </div>
                        </Arc>
                    </animated.div>
                    <animated.div
                        style={locationSpring}
                        className={clsx(
                            "absolute top-0 w-full transition-opacity duration-200",
                            {
                                "pointer-events-none opacity-0": !location,
                                "opacity-100": location,
                            },
                        )}
                    >
                        <Arc className="h-60 w-full xxs:h-72 sm:h-80">
                            <div className="grid h-full place-content-center rounded-md">
                                <Location hideWeather />
                            </div>
                        </Arc>
                    </animated.div>
                </div>
                <div className="h-36 px-6 xxs:h-44 xxs:px-0">
                    {tab === Tab.Vote && (
                        <Description
                            title={
                                <div className="flex">
                                    <b>V</b>
                                    <Glitch text="ote" />
                                </div>
                            }
                            link={{
                                url: "https://vote.finndore.dev",
                                name: "vote.finndore.dev",
                            }}
                            description="Pointing poker is a waste of time, but to make it as painless as possible ive made modern pointing website. I've utilised websockets to update the UI in real time (try the vote on the front page!)."
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
                    )}

                    {tab === Tab.One && (
                        <Description
                            title="One"
                            link={{
                                url: "https://github.com/finndore/one",
                                name: "finndore/one",
                            }}
                            description="A IOT light written using embeded Rust along with a companion app made with Tauri and nextjs"
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
                        </Description>
                    )}
                    {tab === Tab.Spotify && (
                        <Description
                            title="Spot"
                            link={{
                                url: "https://github.com/finndore/spot",
                                name: "finndore/spot",
                            }}
                            description="A spotify api wrapper built to serve top songs and current songs data. Spot also allows control of the currently playing song"
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
                    )}
                    {tab === Tab.Location && (
                        <Description
                            title="Location"
                            link={{
                                url: "https://github.com/finndore/location",
                                name: "finndore/location",
                            }}
                            description="A simple location api that returns my location and weather for that location."
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
                    )}
                </div>
            </div>
            <div className="lg:gap16 mx-auto mt-4 flex flex-col gap-4">
                <div className="flex gap-4">
                    <NextButton onClick={() => prev()}>
                        <DoubleArrowLeftIcon className="scale-125" />
                    </NextButton>
                    <NextButton onClick={() => next()}>
                        <DoubleArrowRightIcon className="scale-125" />
                    </NextButton>
                </div>
                <Progress pause={pause} next={reverse ? prev : next} />
            </div>
        </div>
    );
}
