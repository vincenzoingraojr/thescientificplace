import Layout from "../components/Layout";
import { useMeQuery } from "../generated/graphql";

function Home() {
    const { data } = useMeQuery({ fetchPolicy: "network-only" });

    const HomeContent = (
        <>
            Home. You are {data?.me?.firstName}
        </>
    );

    return (
       <Layout content={HomeContent} />
    );
}

export default Home;