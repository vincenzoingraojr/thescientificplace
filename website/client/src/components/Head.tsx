import { FunctionComponent } from "react";
import { Helmet } from "react-helmet";

export interface HeadProps {
    title: String;
}

const Head: FunctionComponent<HeadProps> = ({ title }) => {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );
}

export default Head;