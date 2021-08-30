import Head from "../components/Head";
import Layout from "../components/Layout";
import { useMeQuery } from "../generated/graphql";

function Home() {
    const { data } = useMeQuery({ fetchPolicy: "network-only" });

    const HomeContent = (
        <>
            <Head title="The Scientific Place | Home" />
            Home. You are {data?.me?.firstName}
        </>
    );

    return (
       <Layout title="Home" content={HomeContent} />
    );
}

export default Home;