import { Head, Html, Main, NextScript } from 'next/document';

export default function document() {
    return (
        <Html
            style={{
                background: '#000'
            }}
        >
            <title>Finn</title>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                {/* <meta
                    property="og:image"
                    content="https://thoogle.finndore.dev/cover.webp"
                /> */}
                {/* <meta name="twitter:card" content="summary_large_image"></meta> */}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
