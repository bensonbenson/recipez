import "../styles/ellipsis.css";

export const LoadingText = () => {
  return (
    <h2>
      cookin'
      <span className="ellipsis-anim">
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </span>
    </h2>
  );
};
