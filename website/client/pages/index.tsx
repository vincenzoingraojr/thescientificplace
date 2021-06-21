import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>The Scientific Place</title>
        <meta name="description" content="The social network of scientists" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        Hello!
      </div>

      <footer>
        &copy; 2021 The Scientific Place
      </footer>
    </>
  )
}
