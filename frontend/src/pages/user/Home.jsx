import { useEffect, useState } from "react";
import { getStores, searchStores } from "../../services/store.service";
import { rateStore } from "../../services/rating.service";
import StoreList from "../../components/store/StoreList";
import AppHeader from "../../components/common/AppHeader";

import "./User.css";

const Home = () => {
  const [stores, setStores] = useState([]);
  const [query, setQuery] = useState("");

  const fetchStores = async () => {
    const res = await getStores();
    setStores(res.data);
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleSearch = async () => {
    const res = await searchStores(query);
    setStores(res.data);
  };

  const handleRate = async (storeId, rating) => {
    await rateStore({ store_id: storeId, rating });
    fetchStores();
  };

  return (
    <div className="user-page">

      <AppHeader />

      <div className="user-container">

        {/* HEADER */}
        <div className="page-header">
          <h2>Explore Stores</h2>
          <p>Search, discover and rate stores around you</p>
        </div>

        {/* SEARCH */}
        <div className="search-bar">

          <input
            placeholder="Search by name or address..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>

          <button className="reset-btn" onClick={fetchStores}>
            Reset
          </button>

        </div>

        {/* STORE LIST */}
        <div className="store-wrapper">
          <StoreList stores={stores} onRate={handleRate} />
        </div>

      </div>

    </div>
  );
};

export default Home;