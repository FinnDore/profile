import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns-tz";
import { useEffect, useMemo, useState } from "react";

export function useLocation() {
    return useQuery({
        queryKey: ["location"],
        queryFn: async () =>
            fetch("https://location.finndore.dev/location").then(
                (r) => r.json() as Promise<Location>,
            ),
        refetchInterval: 1000 * 60 * 10,
    });
}

function useCurrentTime() {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return time;
}

export function LocationDescription() {
    const locationQuery = useLocation();
    const location = locationQuery.data;
    const currently = location?.currently;

    const currentTime = useCurrentTime();

    const formattedTime = useMemo(() => {
        if (typeof location?.currently === "undefined") return {};

        return {
            time: format(currentTime, "HH:mm:ss", {
                timeZone: location.timezone,
            }),
            abbr: format(currentTime, "zzz", { timeZone: location.timezone }),
        };
    }, [currentTime, location?.currently, location?.timezone]);

    return (
        <span>
            For example its currently{" "}
            <b className="font-mono">{formattedTime.time}</b>{" "}
            {formattedTime.abbr} and <b>{currently?.temperature}°C</b> in{" "}
            <b className="inline-block first-letter:capitalize">
                {location?.location}
            </b>
            , other stats include {currently?.humidity}% humidity and a cloud
            cover of {currently?.cloudCover ?? 0 * 100}%.
        </span>
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
