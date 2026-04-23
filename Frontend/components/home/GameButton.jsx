const GameButton = ({ onClick, children, variant = "primary" }) => {
  const styles =
    variant === "primary"
      ? "bg-cyan-600 hover:bg-cyan-500"
      : "bg-slate-700 hover:bg-slate-600";

  return (
    <button
      onClick={onClick}
      className={`${styles} px-6 py-3 rounded-lg font-bold transition-all transform active:scale-95 text-white`}>
      {children}
    </button>
  );
};

export default GameButton;
