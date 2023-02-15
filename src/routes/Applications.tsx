import { useEffect } from "react";
import { DashboardStats } from "../components/dashboard-stats";
import { NavBar } from "../components/navbar";
import { ContentTabs } from "../components/content-tabs";

function Applications() {
  return (
    <div className="flex flex-col w-full">
      <NavBar />
      <div className="divider"></div>
      <p>Applications</p>
    </div>
  );
}

export default Applications;
