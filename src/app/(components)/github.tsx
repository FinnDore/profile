"use client";
import { useQuery } from "@tanstack/react-query";
import { IBM_Plex_Mono } from "next/font/google";
import { useMemo } from "react";

const ibm_plex_mono = IBM_Plex_Mono({
    weight: ["400", "600"],
    subsets: ["latin"],
});

export function Github() {
    const contributionQuery = useQuery({
        queryKey: ["github"],
        queryFn: async () =>
            await fetch("https://gh.finndore.dev/contributions/finndore").then(
                async (res) => {
                    const val = (await res.json()) as unknown as {
                        contributionCount: number;
                        date: string;
                    }[];
                    return val.splice(val.length - 42, val.length);
                },
            ),
        refetchInterval: 10000,
    });

    const { max, min } = useMemo(
        () =>
            contributionQuery.data?.reduce(
                (acc, day) => {
                    return {
                        max: Math.max(acc.max, day.contributionCount),
                        min: Math.min(acc.min, day.contributionCount),
                    };
                },
                { max: 0, min: Infinity },
            ) ?? { max: 0, min: 0 },
        [contributionQuery.data],
    );

    if (!contributionQuery.data) return null;

    return (
        <div className="flex-flex-col mt-auto p-4">
            <div className={ibm_plex_mono.className}>
                <div className={"mb-2 flex gap-3"}>
                    <picture className="my-auto ">
                        <img className="w-4" src="/pr.svg" alt="Github logo" />
                    </picture>
                    <div className="text-xs">
                        <h2 className="font-bold">
                            feat: updated the template
                        </h2>
                        <p>
                            finndore / <b>t3-starter</b>
                        </p>
                    </div>
                </div>
            </div>
            <div className=" flex max-h-16 flex-col flex-wrap">
                {contributionQuery.data.map((day) => {
                    const opacity = Math.max(
                        0.0,
                        (day.contributionCount - min) / (max - 3 - min),
                    );
                    return (
                        <div
                            key={day.date}
                            style={{
                                backgroundColor:
                                    opacity < 0.025
                                        ? "white"
                                        : `rgba(0, 0, 0, ${Math.max(opacity)})`,
                            }}
                            className="contribution-shaddow m-0.5 aspect-square w-4 cursor-pointer rounded-sm bg-black transition-all hover:scale-110"
                        ></div>
                    );
                })}
            </div>
        </div>
    );
}
