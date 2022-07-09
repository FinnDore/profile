import { AppProps } from 'next/app';
import '../styles/reset.scss';
import '../styles/styles.scss';

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
