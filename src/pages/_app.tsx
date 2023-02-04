import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type AppType } from 'next/dist/shared/lib/utils';

import '@fontsource/roboto';
import '@fontsource/roboto-serif';
import '@fontsource/roboto/900.css';
import { SpotifyStatus } from '../components/spotify-status';
import '../styles/globals.css';

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <div className="absolute bottom-0 z-20 pointer-events-none">
                <SpotifyStatus />
            </div>
        </QueryClientProvider>
    );
};

export default MyApp;
