import { useMemo } from "react";

export const useMobile = () =>
    useMemo(
        () =>
            /iPhone|iPad|iPod|Android/i.test(
                typeof window === "undefined"
                    ? ""
                    : window?.navigator.userAgent,
            ),
        [],
    );
