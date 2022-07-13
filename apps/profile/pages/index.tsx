import styles from './index.module.scss';

export default function index() {
    return (
        <div className="relative h-full overflow-hidden bg-black">
            <img
                className={`${styles.moon} absolute`}
                src="/moon.svg"
                alt="big grey ball in the sky"
            />

            <div className="grid h-full place-items-center">
                <h1 className="left-50 top-90 absolute bg-gradient-to-br from-stone-900 to-zinc-50 bg-clip-text text-5xl font-extrabold text-transparent sm:text-6xl md:text-8xl">
                    FINN DORE
                </h1>
            </div>
        </div>
    );
}
