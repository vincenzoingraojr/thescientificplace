import { FunctionComponent } from "react";

export interface ErrorFieldProps {
    error: string;
}

const ErrorField: FunctionComponent<ErrorFieldProps> = ({ error }) => {
    return (
        <div className="error-field">
            {error}
        </div>
    );
}

export default ErrorField;