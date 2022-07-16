function FooterSection({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-5 my-auto mt-auto flex h-full flex-col md:mx-14">
            {children}
        </div>
    );
}

function FooterTitle({ name }: { name: string }) {
    return (
        <div className="pb-1 text-[.5rem] text-white md:text-xs">{name}</div>
    );
}

function FooterItem({ name, href }: { name: string; href: string }) {
    return (
        <a
            className="pt-1 text-xs font-light text-zinc-600 transition-colors hover:text-zinc-100 md:text-base"
            href={href}
            rel="noreferrer"
            target="_blank"
        >
            {name}
        </a>
    );
}

export default function Footer() {
    return (
        <div className="flex h-56 w-full justify-center border-t border-zinc-900 bg-black px-1 py-10 md:px-20 lg:px-48">
            <FooterSection>
                <FooterTitle name={'Contact Me'}></FooterTitle>
                <FooterItem
                    name={'finn@finndore.dev'}
                    href={'mailto:finn@finndore.dev'}
                />
                <FooterItem
                    name={'GitHub'}
                    href={'https://github.com/FinnDore'}
                />
            </FooterSection>
            <FooterSection>
                <FooterTitle name={'Projects'}></FooterTitle>
                <FooterItem
                    name={'Topic Inspector'}
                    href={'https://topic-inspector.finndore.dev'}
                />
                <FooterItem
                    name={'Kafka Tools'}
                    href={'https://github.com/FinnDore/kafka-tools'}
                />
                <FooterItem
                    name={'Something'}
                    href={'https://something.finndore.dev'}
                />
            </FooterSection>
            <FooterSection>
                <FooterTitle name={'Credits'}></FooterTitle>
                <FooterItem
                    name={'The Moon'}
                    href={'https://www.figma.com/@liammews'}
                />
            </FooterSection>
        </div>
    );
}
