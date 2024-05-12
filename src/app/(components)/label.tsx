import { clsx } from "clsx";
import { useEffect, useRef, useState } from "react";

export function Label(props: {
    name: string;
    icon: React.ReactNode;
    bgColor: `bg-[${string}]`;
    bgGlow: `bg-[radial-gradient(#${string}_0%,transparent_70%)]`;
}) {
    return (
        <BorderGlowButton bgColor={props.bgColor} bgGlow={props.bgGlow}>
            <div className="my-auto h-4 w-4">{props.icon}</div>
            <span className="text-sm">{props.name}</span>
        </BorderGlowButton>
    );
}

const BorderGlowButton = (props: {
    children: React.ReactNode;
    bgColor: `bg-[${string}]`;
    bgGlow: `bg-[radial-gradient(#${string}_0%,transparent_70%)]`;
}) => {
    // TODO give creddit
    const ref = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({
        x: "-100%",
        y: "-100%",
    });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setMousePosition({ x: `${x}px`, y: `${y}px` });
        };
        document.addEventListener("mousemove", handleMouseMove);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div
            className={clsx(
                "relative mx-auto transform select-none overflow-hidden rounded-2xl transition-transform ease-in-out active:scale-90",
                props.bgColor,
            )}
            ref={ref}
        >
            <span
                className={clsx(
                    `absolute z-0 h-28 w-28 -translate-x-1/2 -translate-y-1/2  `,
                    props.bgGlow,
                )}
                style={
                    {
                        left: mousePosition.x,
                        top: mousePosition.y,
                    } as any
                }
            ></span>
            <div className="relative z-10 m-[1px] flex gap-2 rounded-2xl  bg-white/90 px-4 py-1  backdrop-blur-sm">
                {props.children}
            </div>
        </div>
    );
};
