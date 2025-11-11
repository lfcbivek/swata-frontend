import React from "react";
import SignUpForm from "./SignUpForm";
import GetStartedLayout from "./GetStartedLayout";

const GetStarted = () => {
  return (
    <GetStartedLayout>
      <h1 id="tagline">More Leads. More Wins. More Revenue.</h1>
      <SignUpForm />
    </GetStartedLayout>
  );
};

export default GetStarted;