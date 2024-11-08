import React from 'react'
import badRequest from "../../assets/animations/error.json";
import ErrorPage from "../../components/layout/ErrorPage/ErrorPage";

function ServerError() {
  return (
      <ErrorPage
          title={"Internal Server Error"}
          message={"Something went wrong at our end. Please try again later."}
          buttonText={"Go Back"}
          lottieData={badRequest}
      />
  )
}

export default ServerError
