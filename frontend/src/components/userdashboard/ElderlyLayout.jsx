import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import { ElderlyProvider } from "./UserContext";

const ElderlyLayout = () => {
  return (
    <ElderlyProvider>
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
    </ElderlyProvider>
  );
};

export default ElderlyLayout;
