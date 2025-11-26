// GetStartedLayout.tsx
import React from "react";
import "./GetStarted.scss";

const GetStartedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="GetStarted">
      <img src="/swata.svg" alt="swata" className="top-left-image" />
      {children}
    </div>
  );
};

export default GetStartedLayout;