import React from 'react';
import ErrorPage from "../../components/layout/ErrorPage/ErrorPage";

import badRequest from "../../assets/animations/error.json";

function Forbidden(props) {
  return (
      <ErrorPage
          title={"Forbidden!"}
          message={"We are sorry, but you do not have access to this page."}
          buttonText={"Go Back"}
          lottieData={badRequest}
      />
  );
}

export default Forbidden;