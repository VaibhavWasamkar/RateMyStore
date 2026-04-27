import DataTable from "../common/DataTable";

const UserTable = ({ users }) => {
  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "address", label: "Address" },
    { key: "role", label: "Role" },
    {
      key: "rating",
      label: "Rating",
      render: (row) =>
        row.role === "owner"
          ? <span style={{ color: "#facc15" }}>⭐ {row.rating ?? 0}</span>
          : "-"
    }
  ];

  return <DataTable data={users} columns={columns} />;
};

export default UserTable;