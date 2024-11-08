import React from 'react';
import ErrorPage from "../../components/layout/ErrorPage/ErrorPage";

import badRequest from "../../assets/animations/error.json";

function BadRequest(props) {
    return (
        <ErrorPage
            title={"Bad Request!"}
            message={"The request could not be understood by the server due to malformed syntax or missing required information."}
            buttonText={"Go Back"}
            lottieData={badRequest}
        />
    );
}

export default BadRequest;