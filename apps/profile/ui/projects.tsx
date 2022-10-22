export function Project({
    props: { name, href, description }
}: {
    props: {
        name: string;
        description: string;
        href: string;
    };
}) {
    return (
        <div className="border-color-violet-200 my-4 rounded-md border-2 py-5 px-5 backdrop-blur">
            <h1 className="py-2 underline">
                <a href={href} rel="noreferrer" target="_blank">
                    {name}
                </a>
            </h1>
            <p>{description}</p>
        </div>
    );
}

export default function Projects() {
    return (
        <div>
            <Project
                props={{
                    name: 'Time',
                    description:
                        'A simple site that displays the current time in multiple timezones.',
                    href: 'https://time.finndore.dev'
                }}
            />
            <Project
                props={{
                    name: 'Topic Inspector',
                    description:
                        'A quick and easy way to visualize the size of your kafka topics across multiple brokers.',
                    href: 'https://topic-inspector.finndore.dev'
                }}
            />
            <Project
                props={{
                    name: 'Something',
                    description:
                        'An easy to deploy payment backend written in rust and build around stripe, complimented by a headless component library for both react and angular.',
                    href: 'https://github.com/FinnDore/something'
                }}
            />
        </div>
    );
}
