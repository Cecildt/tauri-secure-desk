import { useLoaderData } from "react-router-dom";
import { NavBar } from "../components/navbar";
import { OsUpdatesTable } from "../components/os-updates-table";
import { OS } from "../services/os-data";

export default function OperatingSystem() {
  const os_info = useLoaderData() as OS;

  return (
    <div className="flex flex-col w-full">
      <NavBar />
      <div className="divider"></div>
      <div
        tabIndex={0}
        className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
      >
        <div className="collapse-title text-xl font-medium">
          Operating System - {os_info.OsName}
        </div>
        <div className="collapse-content">
          <p>Windows Name: {os_info.OsName}</p>
          <p>Windows Version: {os_info.WindowsVersion}</p>
          <p>Windows Edition: {os_info.WindowsEditionId}</p>
          <p>Windows Build: {os_info.WindowsBuildLabEx}</p>
          <p>Windows Installation Type: {os_info.WindowsInstallationType}</p>
          <p>OS Display Version: {os_info.OSDisplayVersion}</p>
          <p>OS Architecture: {os_info.OsArchitecture}</p>
          <p>Domain: {os_info.CsDomain}</p>
        </div>
        <OsUpdatesTable />
      </div>
    </div>
  );
}
