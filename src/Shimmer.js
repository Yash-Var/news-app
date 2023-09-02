const Shimmmer = () => {
  return (
    <>
      <div className="All-Cards">
        {Array(10)
          .fill("")
          .map((e, index) => (
            <div key={index} className="Shimmer-card"></div>
          ))}
      </div>
    </>
  );
};
export default Shimmmer;
