import { clsx } from "clsx";

export function Arc(props: { children: React.ReactNode; className?: string }) {
    return (
        <div
            className={clsx(
                props.className,
                "relative rounded-md border border-black/10 bg-white p-1 shadow-md",
            )}
        >
            <div className="noise absolute left-0 top-0 w-full rounded-md opacity-40 invert"></div>
            <div className="relative h-full w-full rounded-md border border-black/10 bg-[#fafafafa] shadow-lg">
                {props.children}
            </div>
        </div>
    );
}
