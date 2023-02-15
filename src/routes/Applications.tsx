import { useLoaderData } from "react-router-dom";
import { NavBar } from "../components/navbar";
import { Application } from "../services/applications-data";

export default function Applications() {
  const applications = useLoaderData() as Application[];

  return (
    <div className="flex flex-col w-full">
      <NavBar />
      <div className="divider"></div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Version</th>
              <th>Publisher</th>
              <th>Installed Date</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{app.name}</td>
                <td>{app.version}</td>
                <td>{app.publisher}</td>
                <td>{app.installDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
