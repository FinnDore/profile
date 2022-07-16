export function Project({
    props: { name, href }
}: {
    props: {
        name: string;
        href: string;
    };
}) {
    return (
        <div className="border-color-violet-200 my-10 border-2 py-2 px-5 font-extrabold">
            <h1 className="py-2">{name}</h1>
            <p>
                Light weight kafka client built with rust and react with support
                for mac, linux and windows
            </p>
        </div>
    );
}

export default function Projects() {
    return (
        <div>
            <Project
                props={{
                    name: 'Kafka tools',
                    href: 'https://github.com/kafka-tools'
                }}
            />
        </div>
    );
}
