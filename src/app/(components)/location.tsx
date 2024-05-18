import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { format } from "date-fns-tz";
import { useMemo } from "react";

export function Location(props: { hideWeather?: boolean }) {
    const locationQuery = useQuery({
        queryKey: ["location"],
        queryFn: async () =>
            fetch("https://location.finndore.dev/location").then(
                (r) => r.json() as Promise<Location>,
            ),
        refetchInterval: 1000 * 60 * 10,
    });

    const location = locationQuery.data;
    const currently = location?.currently;
    const url = `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/${location?.longitude},${location?.latitude},10.06,0/300x300@2x?access_token=pk.eyJ1IjoiZmlubnh4eHgiLCJhIjoiY2xwMDVvcDE1MDh5czJrbzV2Z3M0cWFwdSJ9.aRpnp1nGeC5S1j0J37_Fng`;

    const formattedTime = useMemo(() => {
        if (typeof location?.currently === "undefined") return {};

        return {
            time: format(new Date(), "HH:mm", { timeZone: location.timezone }),
            abbr: format(new Date(), "zzz", { timeZone: location.timezone }),
        };
    }, [location?.currently, location?.timezone]);

    return (
        <div className="flex gap-4">
            <div className="relative h-44 w-72 select-none overflow-hidden">
                <div className="marker-outer absolute left-1/2 top-1/2 z-10 rounded-full">
                    <div className="marker-inner center-absolute rounded-full"></div>
                </div>
                <div
                    className={clsx(" absolute h-full w-full", {
                        "map-gradient": !props.hideWeather,
                        "map-gradient2": props.hideWeather,
                    })}
                ></div>

                {location && (
                    <picture>
                        {/* TODO AT BUILD TIME */}
                        <img src={url} alt="" />
                    </picture>
                )}
            </div>
            {!props.hideWeather && (
                <div className="flex w-min flex-col justify-center text-nowrap italic">
                    <span>
                        <b>{formattedTime.time}</b> {formattedTime.abbr}
                    </span>
                    <span>
                        <b>{currently?.temperature}°C</b>
                    </span>
                    <span>
                        <b>{currently?.humidity}%</b> humidity
                    </span>

                    <span>
                        <b>{currently?.windSpeed}mph</b> wind
                    </span>
                </div>
            )}
        </div>
    );
}

type Location = {
    location: string;
    latitude: number;
    longitude: number;
    timezone: string;
    offset: number;
    elevation: number;
    currently: {
        time: number;
        summary: string;
        icon: string;
        nearestStormDistance: number;
        nearestStormBearing: number;
        precipIntensity: number;
        precipProbability: number;
        precipIntensityError: number;
        precipType: string;
        temperature: number;
        apparentTemperature: number;
        dewPoint: number;
        humidity: number;
        pressure: number;
        windSpeed: number;
        windGust: number;
        windBearing: number;
        cloudCover: number;
        uvIndex: number;
        visibility: number;
        ozone: number;
    };
};
