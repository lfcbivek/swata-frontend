import React from "react";
import SignUpForm from "./SignUpForm";
import GetStartedLayout from "./GetStartedLayout";

const GetStarted = () => {
  return (
    <GetStartedLayout>
      <h1 id="tagline">Get started with smarter workflows today</h1>
      <SignUpForm />
    </GetStartedLayout>
  );
};

export default GetStarted;