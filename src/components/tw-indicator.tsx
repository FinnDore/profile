"use client";
import { useEffect, useState } from "react";

export function TailwindIndicator() {
    const [size, setSize] = useState(0);
    useEffect(() => {
        setSize(window.innerWidth);
        window.addEventListener("resize", () => setSize(window.innerWidth));
        return () =>
            window.removeEventListener("resize", () =>
                setSize(window.innerWidth),
            );
    }, []);

    if (process.env.NODE_ENV === "production") return null;

    return (
        <div className="fixed bottom-1 left-1 z-50 flex h-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white">
            <div className="block xxs:hidden">none</div>
            <div className="hidden xxs:block sm:hidden">xxs</div>
            <div className="hidden sm:block md:hidden">sm</div>
            <div className="hidden md:block lg:hidden">md</div>
            <div className="hidden lg:block xl:hidden">lg</div>
            <div className="hidden xl:block 2xl:hidden">xl</div>
            <div className="hidden 2xl:block">2xl</div>
            <div className="ml-2">{size}px</div>
        </div>
    );
}
