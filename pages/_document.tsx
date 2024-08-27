import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang={'en'}>
      <Head>
        <link href={'/favicon.ico'} rel={'icon'} />
        {/* <link href={'https://fonts.googleapis.com'} rel={'preconnect'} />
        <link href={'https://fonts.gstatic.com'} rel={'preconnect'} />
        <link
          href={
            'https://fonts.googleapis.com/css2?family=Noto+Sans+Display:wght@300;400;500;700&display=swap'
          }
          rel={'stylesheet'}
        /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
