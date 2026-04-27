import RatingStars from "./RatingStars";

const StoreCard = ({ store, onRate }) => {
  return (
    <div className="feature-card large">

      <h3>{store.name}</h3>

      <p>{store.address}</p>

      <p>
        ⭐ Avg Rating:{" "}
        {store.average_rating
          ? Number(store.average_rating).toFixed(1)
          : "No Ratings"}
      </p>

      <p>
        Your Rating:{" "}
        {store.user_rating ? `⭐ ${store.user_rating}` : "Not rated"}
      </p>

      {/* ⭐ rating section */}
      <div className="rating-list">

        <div className="rating-row">
          <span>Rate this store</span>
          <span>
            <RatingStars
              currentRating={store.user_rating || 0}
              onRate={(rating) => onRate(store.id, rating)}
            />
          </span>
        </div>

      </div>

    </div>
  );
};

export default StoreCard;