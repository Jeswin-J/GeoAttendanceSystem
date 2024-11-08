import React from 'react';
import ErrorPage from "../../components/layout/ErrorPage/ErrorPage";

function BadRequest(props) {
    return (
        <ErrorPage
            title={"Bad Request!"}
            message={"The request could not be understood by the server due to malformed syntax or missing required information."}
            buttonText={"Go Back"}
        />
    );
}

export default BadRequest;