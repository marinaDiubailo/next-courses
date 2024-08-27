import type { AppProps } from 'next/app'

import ym, { YMInitializer } from 'react-yandex-metrika'

import { Noto_Sans_Display } from 'next/font/google'
import Head from 'next/head'
import Router from 'next/router'

import '@/app/styles/globals.scss'

Router.events.on('routeChangeComplete', (url: string) => {
  if (typeof window !== 'undefined') {
    ym('hit', url)
  }
})

const notoSansDisplay = Noto_Sans_Display({ subsets: ['latin'] })

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <title>NEXT courses</title>
        <link href={'https://mc.yandex.ru'} rel={'preconnect'} />
        <meta content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} property={'og:url'} />
        <meta content={'ru_Ru'} property={'og:locale'} />
        <meta content={'Подборка курсов'} name={'description'}></meta>
      </Head>
      <style global jsx>{`
        html {
          font-family: ${notoSansDisplay.style.fontFamily};
        }
      `}</style>
      <YMInitializer accounts={[]} options={{ defer: true, webvisor: true }} version={'2'} />
      <Component {...pageProps} />
    </>
  )
}
