import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useEffect, useState } from 'react';
import Head from 'next/head';

import type { AppProps } from 'next/app';

import '/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [hideBanner, setHideBanner] = useState<boolean>(true);

  useEffect(() => {
    setHideBanner(localStorage.hideBanner);
  }, [hideBanner]);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <title>GWENTcards</title>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Keep track of which cards you've collected for the Witcher 3 GWENT minigame."
          />
          <meta name="keywords" content="GWENT, cards, minigame, witcher,the witcher 3, game, card, collect, filter" />
          <meta property="og:site_name" content="GWENTcards" />
          <meta property="og:title" content="GWENTcards: collect cards for the Witcher 3 mini game" />
          <meta
            property="og:description"
            content="Keep track of which cards you've collected for the Witcher 3 GWENT minigame."
          />
          <meta property="og:image" content="/icon.png" />
          <meta property="og:url" content="https://gwentcards.net" />
        </Head>

        {!hideBanner && (
          <div className="bg-gradient-to-r from-cyan-700 to-indigo-400 p-3 flex justify-end text-white">
            <a href="https://old.gwentcards.net/" className="mr-auto justify-center">
              Looking for the old site with accounts and offline functionality? Go to&nbsp;
              <span className="underline">old.gwentcards.net</span>.
            </a>
            <span
              className="text-sm cursor-pointer"
              onClick={() => {
                localStorage.setItem('hideBanner', 'true');
                setHideBanner(true);
              }}
            >
              (close)
            </span>
          </div>
        )}
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
