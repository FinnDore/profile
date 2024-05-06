export default function Page() {
    return (
        <main className="h-screen bg-white flex flex-col">
            <img
                className="m-auto md:hidden max-h-[70vh] relative aspect-auto"
                src="/finn-sm.webp"
                alt="Picture with the text 'finn'"
            />
            <img
                className="mx-auto md:block hidden max-w-[clamp(80vw,75rem,90vw)] relative aspect-auto"
                src="/finn.webp"
                alt="Picture with the text 'finn'"
            />
        </main>
    );
}
