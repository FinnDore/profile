import { useMemo, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounceFunction<T extends (...args: any[]) => any>(
    func: T,
    delay = 100,
): T {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    return useMemo(
        () =>
            ((...args: Parameters<T>) => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => func(...args), delay);
            }) as T,
        [delay, func, timeoutRef],
    );
}
