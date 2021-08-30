import {
    Route,
    Redirect,
    RouteProps,
} from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
    component: any;
    isAuth: boolean;
}

const IsAuthenticated = (props: PrivateRouteProps) => {
    const { component: Component, isAuth, ...rest } = props;

    return (
        <Route
            {...rest}
            render={(routeProps) =>
                isAuth ? (
                    <Component {...routeProps} />
                ) : (
                        <Redirect
                            to={{
                                pathname: '/',
                                state: { from: routeProps.location }
                            }}
                        />
                    )
            }
        />
    );
};

export default IsAuthenticated;