import clsx from "clsx";

import { forwardRef, type HTMLProps } from "react";

export const Pfp = forwardRef<
    HTMLDivElement,
    HTMLProps<HTMLDivElement> & {
        name?: string | null | undefined;
        border?: string;
        image?: string | null;
        pfpHash?: string | null;
    }
>(function Pfp({ name, border, image, pfpHash, ...props }, ref) {
    const pictureName = encodeURIComponent(pfpHash ?? "");

    return (
        <div
            ref={ref}
            {...props}
            className={clsx("aspect-square", props.className)}
        >
            <div className="relative h-full w-full cursor-pointer transition-all hover:scale-110">
                <div
                    className={clsx(
                        border,
                        "absolute z-10 h-full w-full overflow-clip rounded-full border border-black/20 dark:border-white/40",
                    )}
                >
                    <picture className="block h-[70px] min-h-full w-[70px]  min-w-full overflow-clip">
                        <source srcSet={"/NOISE.webp"} type="image/webp" />
                        <img
                            alt={`profile picture for ${name ?? "a user"}`}
                            className="aspect-square min-h-full"
                        />
                    </picture>
                </div>
                <picture className="absolute block h-full w-full overflow-clip rounded-full blur-md saturate-150">
                    <source
                        srcSet={image ?? `/api/gradient/${pictureName}`}
                        suppressHydrationWarning
                    />
                    <img
                        className="block h-full w-full rounded-full"
                        alt={`profile picture for ${name ?? "a user"}`}
                    />
                </picture>
                <div className="absolute block h-full w-full overflow-clip rounded-full saturate-150">
                    <picture className="">
                        <source
                            suppressHydrationWarning
                            srcSet={image ?? `/api/gradient/${pictureName}`}
                        />
                        <img
                            className="h-full w-full"
                            alt={`profile picture for ${name ?? "a user"}`}
                        />
                    </picture>
                </div>
            </div>
        </div>
    );
});

type Users = { name: string; id: string; image?: string; pfpHash?: string }[];
export const VoteButton = (props: { users: Users; small?: boolean }) => {
    return (
        <div className="my-2 flex select-none flex-col">
            <button
                role="button"
                className={clsx(
                    "btn-shadow relative z-20 h-9 text-white transition-all md:h-12 md:w-16",
                    {
                        "!h-9 !w-12": props.small,
                    },
                )}
            >
                <div className="-z-1 absolute -bottom-1 left-0 h-4 w-full rounded-b-sm bg-orange-600"></div>
                <div className="z-1 absolute -top-1 flex h-full w-full rounded-sm  border-2 border-orange-400 bg-orange-600 text-white shadow-[inset_1px_1px_12px_#0000004f] transition-all hover:bg-orange-500">
                    <div className="m-auto select-none text-xs font-bold md:text-base">
                        Vote
                    </div>
                </div>
                {props.users?.length && (
                    <div className="absolute -right-0 -top-2 h-4 w-full ">
                        <div className="relative">
                            {props.users.map((user) => (
                                <Pfp
                                    key={user.id}
                                    image={user.image}
                                    pfpHash={user.pfpHash}
                                    border={"border-black dark:border-white"}
                                    name={user.name}
                                    className="absolute top-0 h-4"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </button>
        </div>
    );
};
