import { useEffect } from "react";
import "./App.css";
import { DashboardStats } from "../components/dashboard-stats";
import { NavBar } from "../components/navbar";
import { ContentTabs } from "../components/content-tabs";

function App() {
  return (
    <div className="flex flex-col w-full">
      <NavBar />
      <div className="divider"></div>
      <DashboardStats />
      <div className="divider"></div>
      <ContentTabs />
    </div>
  );
}

export default App;
