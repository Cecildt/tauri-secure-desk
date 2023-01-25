import { AppsTable } from "./apps-table";

export function ContentTabs() {
  return (
    <div>
      <div className="tabs tabs-boxed">
        <a className="tab tab-active">Applications Updates</a>
        <a className="tab">OS Updates</a>
        <a className="tab">Recent Vulnerabilities</a>
      </div>
      <AppsTable />
    </div>
  );
}
