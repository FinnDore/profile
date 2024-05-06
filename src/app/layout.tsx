import { AxiomWebVitals } from "next-axiom";
import "./globals.css";

export default function Layout(props: { children: React.ReactNode }) {
    return (
        <html>
            <head></head>
            <AxiomWebVitals />
            <body>{props.children}</body>
        </html>
    );
}
