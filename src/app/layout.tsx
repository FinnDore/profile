import './globals.css';

export default function Layout(props: { children: React.ReactNode }) {
    return (
        <html>
            <head></head>
            <body>{props.children}</body>
        </html>
    );
}
