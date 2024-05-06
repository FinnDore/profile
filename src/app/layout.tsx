import { AxiomWebVitals } from "next-axiom";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
});

export default function Layout(props: { children: React.ReactNode }) {
    return (
        <html>
            <head></head>
            <AxiomWebVitals />
            <body>{props.children}</body>
        </html>
    );
}
