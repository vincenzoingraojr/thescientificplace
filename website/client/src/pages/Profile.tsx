import { useHistory } from "react-router-dom";
import { setAccessToken } from "../accessToken";
import Layout from "../components/Layout";
import { useFindUserQuery, useLogoutMutation, useMeQuery } from "../generated/graphql";

function Profile(props: any) {
    const { username } = props.match.params;

    const history = useHistory();

    const { data: meData } = useMeQuery({ fetchPolicy: "network-only" });

    const [logout, { client }] = useLogoutMutation();

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

    console.log(meData);

    if (meData?.me === null) {
        history.push("/");
    }

    const Profile = (
        <>
            Name: {data?.findUser?.firstName}
            {me ? (
                <button
                    onClick={async () => {
                        await logout();
                        setAccessToken("");
                        await client!.resetStore();

                        history.go(0);
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
        <Layout title="Profile" content={userFound ? Profile : UserNotFound} />
    );
}

export default Profile;