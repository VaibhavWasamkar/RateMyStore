import DataTable from "../common/DataTable";

const RatingTable = ({ stores }) => {
  const columns = [
    { key: "name", label: "Store Name" },
    { key: "email", label: "Email" },
    { key: "address", label: "Address" },
    { key: "owner_name", label: "Owner" },
    {
      key: "rating",
      label: "Rating",
      render: (row) =>
        row.rating ? `⭐ ${row.rating}` : "No Ratings"
    }
  ];

  return <DataTable data={stores} columns={columns} />;
};

export default RatingTable;