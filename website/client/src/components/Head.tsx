import { Helmet } from "react-helmet";

interface Props {
    title: string
}

export const Head: React.FC<Props> = ({ title }) => {
    return (
        <Helmet title={title} />
    );
}

export default Head;