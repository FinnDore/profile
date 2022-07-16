import { Head, Html, Main, NextScript } from 'next/document';

export default function document() {
    return (
        <Html>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
                    rel="stylesheet"
                />
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <meta property="og:title" content="Finn Dore" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="finndore.dev" />
            <meta property="og:image" content="https://finndore.dev/moon.png" />
            <meta
                property="og:description"
                content="Its probably raining where i live"
            />
            <meta name="theme-color" content="#a1a1aa" />

            <meta name="twitter:card" content="summary_large_image"></meta>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
