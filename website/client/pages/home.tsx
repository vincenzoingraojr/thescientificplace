import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>The Scientific Place | Home</title>
        <meta name="description" content="The social network of scientists." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        Home
      </div>
    </>
  );
}