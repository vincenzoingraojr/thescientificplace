import { FunctionComponent } from "react";
import { Helmet } from "react-helmet";

export interface HeadProps {
    title: string;
}

const Head: FunctionComponent<HeadProps> = ({ title }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta property="og:description" content="The social network of scientists." />
        </Helmet>
    );
}

export default Head;