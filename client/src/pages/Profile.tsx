import { useHistory } from "react-router-dom";
import Head from "../components/Head";
import Layout from "../components/Layout";
import { useFindUserQuery, useMeQuery } from "../generated/graphql";

function Profile(props: any) {
    const { username } = props.match.params;

    const history = useHistory();

    const { data: meData } = useMeQuery({ fetchPolicy: "network-only" });

    const { data, loading } = useFindUserQuery({ variables: { username: username }, fetchPolicy: "network-only" });

    const Loading = (
        <>
            Loading...
        </>
    );

    if (loading) {
        return (
            <Layout title="Profile" content={Loading} />
        );
    }
    
    let userFound = false;

    if (data && data.findUser?.username) {
        userFound = true;
    } else {
        userFound = false;
    }

    let me = false;

    if (meData && meData.me && meData.me.username === data?.findUser?.username) {
        me = true;
    } else {
        me = false;
    }

    const Profile = (
        <>
            Name: {data?.findUser?.firstName}
            {me ? (
                <button
                    onClick={async () => {
                        history.push("/logout");
                    }}
                    className="logout margin-top-6"
                >
                    Log out
                </button>
            ) : null}
        </>
    );

    const UserNotFound = (
        <>
            This user does not exist.
        </>
    );

    return (
        <>
            <Head title={userFound ? `${data?.findUser?.firstName} ${data?.findUser?.lastName} | The Scientific Place` : `@${username} | User not found`} />
            <Layout title="Profile" content={userFound ? Profile : UserNotFound} />
        </>
    );
}

export default Profile;