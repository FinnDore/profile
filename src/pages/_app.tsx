import { type AppType } from 'next/dist/shared/lib/utils';

import '@fontsource/roboto-serif';
import '../styles/globals.css';

const MyApp: AppType = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
};

export default MyApp;
