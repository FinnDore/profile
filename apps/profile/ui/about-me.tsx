export default function AboutMe() {
    return (
        <>
            <h1 className="text-base text-2xl font-extrabold text-zinc-400 md:text-4xl lg:text-6xl">
                About Me
            </h1>
            <p className="pt-2 text-sm text-zinc-300 drop-shadow-lg md:text-lg lg:pt-5">
                Frontend software engineer from the{' '}
                <span className="text-cyan-500" title="🌧">
                    UK
                </span>{' '}
                who likes to build pretty things.
            </p>
        </>
    );
}
