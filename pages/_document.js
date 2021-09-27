import Document, { Head, Main, NextScript, Html } from 'next/document';

export default class Documenty extends Document {
  render() {
    return (
      <Html lang='it'>  
        <Head>
          <meta charSet="utf-8" />
					<meta name="description" content="Sito web per il controllo in tempo reale dello spoglio delle elezioni." />
		      <base href="/" />
          
					<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
					<link rel="icon" href="/favicon.ico" type="image/x-icon" />

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }

}