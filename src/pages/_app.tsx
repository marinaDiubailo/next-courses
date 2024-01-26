import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@/app/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <Head>
                <title>OWLTop</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
}
