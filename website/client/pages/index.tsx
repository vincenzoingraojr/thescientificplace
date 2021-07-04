import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>The Scientific Place</title>
        <meta name="description" content="The social network of scientists" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <div className="container-item">
          <div className="site-title">The Scientific Place</div>
          <div>
            This is a place where scientists and science lovers can share ideas, research papers and projects.
          </div>
        </div>
        <div className="container-item">
          <div className="authentication-form">
            Login form
          </div>
        </div>
      </div>

      <footer>
        &copy; 2021 The Scientific Place
      </footer>
    </>
  )
}
