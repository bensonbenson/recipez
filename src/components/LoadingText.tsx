import "../styles/ellipsis.css";

export const LoadingText = () => {
  return (
    <div>
      cookin'
      <span className="ellipsis-anim">
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </span>
    </div>
  );
};
