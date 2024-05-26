import { Analytics } from "@vercel/analytics/react";
import { AxiomWebVitals } from "next-axiom";
import { env } from "../env/client.mjs";
import "./globals.css";

export default function Layout(props: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <title>Finn</title>
                {env.NEXT_PUBLIC_ENV && (
                    <script
                        async
                        src="https://umami.finndore.dev/script.js"
                        data-website-id="0acffcd3-e206-4840-bfb2-68c89da2e36e"
                    ></script>
                )}
                <link rel="icon" href="/favicon.ico" />
            </head>
            <AxiomWebVitals />
            <Analytics />
            <body>{props.children}</body>
        </html>
    );
}
