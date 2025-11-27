import React from "react";
import SignUpForm from "./SignUpForm";
import GetStartedLayout from "./GetStartedLayout";

const GetStarted = () => {
  return (
    <GetStartedLayout>
      <h1 className="text-white text-2xl md:text-4xl text-center mb-10 leading-tight">More Leads. More Wins. More Revenue.</h1>
      <SignUpForm />
    </GetStartedLayout>
  );
};

export default GetStarted;