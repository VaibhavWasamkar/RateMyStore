import "./Home.css";
import HomeHeader from "../components/common/HomeHeader";

const Home = () => {
  return (
    <div className="home">

      <HomeHeader />

      {/* HERO */}
      <section className="hero">
        <h1>Rate Stores. Discover the Best.</h1>
        <p>Find top-rated stores based on real user feedback.</p>
        <h2>★★★★☆</h2>

        <div className="hero-actions">
          <a href="/register">
            <button className="getStarted-btn">Get Started</button>
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature-card">
          <h3>Rate Stores</h3>
          <p>Give ratings from 1 to 5 easily</p>
        </div>

        <div className="feature-card">
          <h3>Search Stores</h3>
          <p>Find stores by name or location</p>
        </div>

        <div className="feature-card">
          <h3>Analytics</h3>
          <p>View ratings and insights</p>
        </div>
      </section>

    </div>
  );
};

export default Home;