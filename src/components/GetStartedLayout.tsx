// GetStartedLayout.tsx
import React from "react";
import "./GetStarted.scss";

const GetStartedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="GetStarted">
      {children}
    </div>
  );
};

export default GetStartedLayout;