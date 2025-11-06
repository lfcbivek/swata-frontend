// Layout.tsx
import React from "react";
import AppSidebar from "../components/AppSidebar";
import AppNavBar from "@/components/AppNavBar";
import "./AppLayout.scss";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen AppLayout">
      {/* Sidebar */}
      <AppSidebar />

      {/* Right side (NavBar on top, children below) */}
      <div className="flex flex-col flex-1">
        <AppNavBar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto children-container">
          {children}
        </main>
      </div>
    </div>

  );
};

export default Layout;
