import { useLoaderData } from "react-router-dom";
import { NavBar } from "../components/navbar";
import { OS } from "../services/os-data";

export default function System() {
  const os_info = useLoaderData() as OS;

  return (
    <div className="flex flex-col w-full">
      <NavBar />
      <div className="divider"></div>
      <div className="flex w-full">
        <div className="grid card flex-grow bg-base-300 rounded-box p-5 m-2">
          <strong>Operating System Information</strong>
          <p>Windows Name: {os_info.OsName}</p>
          <p>Windows Version: {os_info.WindowsVersion}</p>
          <p>Windows Edition: {os_info.WindowsEditionId}</p>
          <p>Windows Build: {os_info.WindowsBuildLabEx}</p>
          <p>Windows Installation Type: {os_info.WindowsInstallationType}</p>
          <p>OS Display Version: {os_info.OSDisplayVersion}</p>
          <p>OS Architecture: {os_info.OsArchitecture}</p>
          <p>Domain: {os_info.CsDomain}</p>
        </div>
        <div className="grid flex-grow card bg-base-300 rounded-box p-5 m-2">
          <strong>Hardware Information</strong>
        </div>
      </div>
    </div>
  );
}
