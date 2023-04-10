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
                <script
                    async
                    defer
                    data-website-id="0acffcd3-e206-4840-bfb2-68c89da2e36e"
                    src="https://umami.finndore.dev/umami.js"
                ></script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
