import React from 'react'
import ErrorPage from "../../components/layout/ErrorPage/ErrorPage";

function ServerError() {
  return (
      <ErrorPage
          title={"Internal Server Error"}
          message={"Something went wrong at our end. Please try again later."}
          buttonText={"Go Back"}
      />
  )
}

export default ServerError
