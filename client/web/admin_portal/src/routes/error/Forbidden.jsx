import React from 'react';
import ErrorPage from "../../components/layout/ErrorPage/ErrorPage";


function Forbidden(props) {
  return (
      <ErrorPage
          title={"Forbidden!"}
          message={"We are sorry, but you do not have access to this page."}
          buttonText={"Go Back"}
      />
  );
}

export default Forbidden;