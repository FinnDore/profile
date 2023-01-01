import type { GetStaticProps } from 'next';
import { Head, Html, Main, NextScript } from 'next/document';
import { env } from '../env/server.mjs';

export default function document({ isProd }: Props) {
    // const isProd = process.env.NODE_ENV === 'production';
    return (
        <Html
            style={{
                background: '#000'
            }}
        >
            <title>Finn</title>
            <Head>
                {isProd && (
                    <script
                        async
                        defer
                        data-website-id="cb9fc9bb-db7c-4a30-a675-7a9b3052bedf"
                        src="https://umami.finndore.dev/umami.js"
                    ></script>
                )}

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

type Props = {
    isProd: boolean;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    return {
        props: { isProd: env.NODE_ENV === 'production' }
    };
};
