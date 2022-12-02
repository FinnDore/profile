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
                    name: 'Thoogle',
                    description: 'A search engine that also answers questions.',
                    href: 'https://thoogle.finndore.dev'
                }}
            />
            <Project
                props={{
                    name: '1436',
                    description:
                        'A website that provides instructions high quality dyi projects, with step by step instructions complemented by embed 3D models.',
                    href: 'https://1436.design'
                }}
            />
        </div>
    );
}
