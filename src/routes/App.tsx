import { useLoaderData } from "react-router-dom";
import "./App.css";
import { DashboardStats } from "../components/dashboard-stats";
import { NavBar } from "../components/navbar";
import { ContentTabs } from "../components/content-tabs";
import { getApplications, Application } from "../services/applications-data";
import { DashboardData } from "../services/dashboard-data";

export default function App() {
  const dashboardData = useLoaderData() as DashboardData;

  return (
    <div className="flex flex-col w-full">
      <NavBar />
      <div className="divider"></div>
      <DashboardStats
        appsCount={dashboardData.AppsCount}
        appsUpdates={dashboardData.AppsUpdatesCount}
        osUpdates={dashboardData.OSUpdatesCount}
      />
      <div className="divider"></div>
      <ContentTabs />
    </div>
  );
}
