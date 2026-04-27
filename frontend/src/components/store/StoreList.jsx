import StoreCard from "./StoreCard";

const StoreList = ({ stores, onRate }) => {
  if (!stores || stores.length === 0) {
    return <p style={{ color: "white", textAlign: "center" }}>No stores found</p>;
  }

  return (
    <div className="features">
      {stores.map((store) => (
        <StoreCard key={store.id} store={store} onRate={onRate} />
      ))}
    </div>
  );
};

export default StoreList;