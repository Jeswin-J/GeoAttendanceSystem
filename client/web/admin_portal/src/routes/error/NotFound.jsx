import React from 'react'
import ErrorPage from "../../components/layout/ErrorPage/ErrorPage";

function NotFound() {
  return (
      <ErrorPage
          title={"Oops! Page Not Found!"}
          message={"We couldn't find the page you were looking for, but it's probably in here somewhere."}
          buttonText={"Go Back"}
      />
  )
}

export default NotFound
