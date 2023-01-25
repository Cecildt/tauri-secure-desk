import { useEffect } from "react";
import "./App.css";
import { ThemeSwitcher } from "./components/theme-switcher";
import { DashboardStats } from "./components/dashboard-stats";

function App() {
  return (
    <div className="App">
      <ThemeSwitcher />
      <DashboardStats />
      <h1 className="text-3xl font-bold underline">Hello Secure Desk!</h1>
      <button className="btn btn-primary">Button</button>
    </div>
  );
}

export default App;
