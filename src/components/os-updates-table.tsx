export function OsUpdatesTable() {
  return (
    <div className="overflow-x-auto mt-2">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Update Date</th>
            <th>Get Update</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>1</th>
            <td>Windows KB1 Update</td>
            <td>20 January 2023</td>
            <td>Link</td>
          </tr>
          <tr className="hover">
            <th>2</th>
            <td>Windows KB2 Update</td>
            <td>15 January 2023</td>
            <td>Link</td>
          </tr>
          <tr>
            <th>3</th>
            <td>Windows KB2 Update</td>
            <td>31 January 2023</td>
            <td>Link</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
