import Layout from "../../components/common/AdminLayout";
import "./Dashboard.css";
import { useEffect, useState } from "react";
import { getDashboard, getAnalytics, getLeaderboard } from "../../services/admin.service";

import {
    BarChart, Bar, XAxis, YAxis, Tooltip,
    LineChart, Line,
    PieChart, Pie, Cell,
    AreaChart, Area,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b"];

const Dashboard = () => {
    const [stats, setStats] = useState({});
    const [analytics, setAnalytics] = useState({});
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        getDashboard().then(res => setStats(res.data));
        getAnalytics().then(res => setAnalytics(res.data));
        getLeaderboard().then(res => setLeaderboard(res.data));
    }, []);

    const summaryData = [
        { name: "Users", value: stats.totalUsers || 0 },
        { name: "Stores", value: stats.totalStores || 0 },
        { name: "Ratings", value: stats.totalRatings || 0 }
    ];

    return (
        <Layout>
            <div className="dashboard">

                {/* STATS */}
                <div className="stats-row">
                    <div className="stat-card">
                        <p>Total Users</p>
                        <b>{stats.totalUsers}</b>
                    </div>
                    <div className="stat-card">
                        <p>Total Stores</p>
                        <b>{stats.totalStores}</b>
                    </div>
                    <div className="stat-card">
                        <p>Ratings Submitted</p>
                        <b>{stats.totalRatings}</b>
                    </div>
                </div>

                {/* CHARTS */}
                <div className="charts-grid">

                    <div className="chart-card">
                        <h4>Role Distribution</h4>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>

                                <Pie
                                    data={analytics.roles || []}
                                    dataKey="count"
                                    nameKey="role"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    innerRadius={30}   // 🔥 donut style (modern)
                                    paddingAngle={0}
                                    labelLine={false}

                                    label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
                                        const RADIAN = Math.PI / 180;
                                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

                                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                        const y = cy + radius * Math.sin(-midAngle * RADIAN);

                                        return (
                                            <text
                                                x={x}
                                                y={y}
                                                fill="#fff"
                                                textAnchor="middle"
                                                dominantBaseline="central"
                                                style={{ fontSize: "12px", fontWeight: "600" }}
                                            >
                                                {value}
                                            </text>
                                        );
                                    }}
                                >
                                    {(analytics.roles || []).map((_, i) => (
                                        <Cell
                                            key={i}
                                            fill={["#6366f1", "#22c55e", "#f59e0b"][i]}
                                        />
                                    ))}
                                </Pie>

                                <Tooltip
                                    contentStyle={{
                                        background: "#1e293b",
                                        border: "none",
                                        color: "#fff"
                                    }}
                                />

                            </PieChart>
                        </ResponsiveContainer>
                        <p className="chart-desc">
                            Shows how users are distributed across different roles such as Admin, Owner, and User.
                        </p>
                    </div>

                    <div className="chart-card">
                        <h4>Top Stores</h4>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart 
                            data={analytics.topStores || []}
                            margin={{ top: 20, right: 40, left: -10, bottom: 0 }}
                            >

                                {/* X AXIS (store names) */}
                                <XAxis
                                    dataKey="name"
                                    stroke="#3033e0"
                                    tick={{ fill: "#e0e7ff", fontSize: 11 }}
                                    interval={0}                 // show all labels
                                    angle={-25}                 // tilt for long names
                                    textAnchor="end"
                                    height={60}                 // give space for rotated text
                                />

                                {/* Y AXIS */}
                                <YAxis
                                    stroke="#3033e0"
                                    tick={{ fill: "#e0e7ff", fontSize: 12 }}
                                />

                                {/* TOOLTIP */}
                                <Tooltip
                                    contentStyle={{
                                        background: "#1e293b",
                                        border: "none",
                                        color: "#fff"
                                    }}
                                />

                                {/* BARS */}
                                <Bar
                                    dataKey="rating"
                                    stroke="#c7d2fe"
                                    fill="#6366f1"
                                    radius={[6, 6, 0, 0]}   // rounded bars (premium look)
                                />

                            </BarChart>
                        </ResponsiveContainer>
                        <p className="chart-desc">
                            Displays the highest-rated stores based on average user ratings.
                        </p>
                    </div>

                    <div className="chart-card">
                        <h4>Rating Spread</h4>
                        <ResponsiveContainer width="100%" height={250}>
  <AreaChart
    data={analytics.ratingDistribution || []}
    margin={{ top: 10, right: 20, left: 0, bottom: 30 }} // 🔥 important
  >

    <CartesianGrid stroke="rgba(255,255,255,0.1)" />

    {/* X AXIS */}
    <XAxis
      dataKey="rating"
      stroke="#3033e0"
      tick={{ fill: "#e0e7ff", fontSize: 12 }}
      label={{
        value: "Rating (Stars)",
        position: "bottom",   // ✅ outside & centered
        offset: 0,
        fill: "#e0e7ff",
        fontSize: 12
      }}
    />

    {/* Y AXIS */}
    <YAxis
  stroke="#3033e0"
  tick={{ fill: "#e0e7ff", fontSize: 12 }}
  label={{
    value: "Number of Ratings",
    angle: -90,
    position: "insideLeft",
    dx: 10,   // horizontal adjust
    dy: 50,     // vertical adjust (center tuning)   // 🔥 key fix
    offset: 10,               // fine-tune spacing
    fill: "#e0e7ff",
    fontSize: 12
  }}
/>

    <Tooltip
      contentStyle={{
        background: "#1e293b",
        border: "none",
        color: "#fff"
      }}
    />

    <Area
      dataKey="count"
      stroke="#6366f1"
      fill="#c7d2fe"
      fillOpacity={0.3}
    />

  </AreaChart>
</ResponsiveContainer>
                        <p className="chart-desc">
                            Shows how ratings are distributed from 1 to 5 stars across all stores.
                        </p>
                    </div>

                </div>

            </div>

        </Layout>
    );
};

export default Dashboard;