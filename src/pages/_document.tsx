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
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
