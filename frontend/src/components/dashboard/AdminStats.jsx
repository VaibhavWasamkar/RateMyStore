const AdminStats = ({ stats }) => {
  const cards = [
    { label: "Users", value: stats.totalUsers, color: "#6366f1" },
    { label: "Stores", value: stats.totalStores, color: "#22c55e" },
    { label: "Ratings", value: stats.totalRatings, color: "#f59e0b" }
  ];

  return (
    <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
      {cards.map((c, i) => (
        <div key={i} style={{
          flex: 1,
          background: "#fff",
          padding: "20px",
          borderRadius: "14px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
          borderLeft: `4px solid ${c.color}`
        }}>
          <p style={{ color: "#64748b" }}>{c.label}</p>
          <h2>{c.value || 0}</h2>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;