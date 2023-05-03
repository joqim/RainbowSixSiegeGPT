import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Generate dynamic gameplay Rainbow six siege gameplay strategies in seconds."
          />
          <meta property="og:site_name" content="https://siege-gpt.vercel.app/" />
          <meta
            property="og:description"
            content="Generate dynamic gameplay Rainbow six siege gameplay strategies in seconds."
          />
          <meta property="og:title" content="SiegeGPT" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="SiegeGPT" />
          <meta
            name="twitter:description"
            content="Generate dynamic gameplay Rainbow six siege gameplay strategies in seconds."
          />
          <meta
            property="og:image"
            content="/r6symbol.png"
          />
          <meta
            name="twitter:image"
            content="/r6symbol.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
