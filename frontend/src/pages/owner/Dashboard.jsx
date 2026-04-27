import { useEffect, useState } from "react";
import AppHeader from "../../components/common/AppHeader";
import { getOwnerDashboard } from "../../services/owner.service";

import "./Owner.css";

const OwnerDashboard = () => {
  const [data, setData] = useState({
    avgRating: 0,
    stores: []
  });

  useEffect(() => {
    getOwnerDashboard().then(res => {
      setData({
        avgRating: res.data.avgRating || 0,
        stores: res.data.stores || []   // 🔥 IMPORTANT
      });
    });
  }, []);

  return (
    <div className="home">

      <AppHeader />

      {/* HERO */}
      <div className="hero">
        <h1>Your Store Dashboard</h1>
        <p>Monitor ratings and customer feedback</p>

        <h3>Overall Average Rating</h3>
        <h2>{data.avgRating ? `⭐ ${data.avgRating}` : "No Ratings"}</h2>
      </div>

      {/* STORES */}
      <div className="features">

        {data.stores.length === 0 ? (
          <p style={{ color: "white" }}>No stores found</p>
        ) : (
          data.stores.map((store) => (
            <div key={store.id} className="feature-card large">

              <h3>{store.name}</h3>

              <p>
                Average Rating:{" "}
                {store.rating ? `⭐ ${store.rating}` : "No Ratings"}
              </p>

              <div className="rating-list">
                {store.users.length === 0 ? (
                  <p>No ratings yet</p>
                ) : (
                  store.users.map((u, i) => (
                    <div key={i} className="rating-row">
                      <span>{u.name}</span>
                      <span>⭐ {u.rating}</span>
                    </div>
                  ))
                )}
              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default OwnerDashboard;