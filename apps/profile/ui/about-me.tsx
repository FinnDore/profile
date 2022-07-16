export default function AboutMe() {
    return (
        <div className="absolute top-[15vh] z-[9999] px-10 text-zinc-300 md:top-[25vh]  lg:top-[40vh] lg:px-28">
            <h1 className="text-base text-2xl font-extrabold text-zinc-400 md:text-4xl lg:text-6xl">
                About Me
            </h1>
            <p className="py-2 text-sm drop-shadow-lg md:text-lg lg:py-5">
                Frontend software engineer from the{' '}
                <span className="text-cyan-500" title="🌧">
                    UK
                </span>{' '}
                who likes to build pretty things.
            </p>
            <div className="flex">
                <a
                    className="px-2 pl-0 text-sm text-zinc-400 underline hover:text-zinc-200"
                    href="mailto:finn@finndore.dev"
                    rel="noreferrer"
                    target="_blank"
                >
                    finn@finndore.dev
                </a>
                <a
                    href="https://github.com/FinnDore"
                    rel="noreferrer"
                    target="_blank"
                    className="px-2 text-sm text-zinc-400 underline hover:text-zinc-200"
                >
                    My GitHub
                </a>
            </div>
        </div>
    );
}
