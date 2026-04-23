const ChoiceCard = ({ type, onClick, disabled, selected }) => {
  const icons = { stone: "🪨", paper: "📄", scissors: "✂️" };

  return (
    <button
      onClick={() => onClick(type)}
      disabled={disabled}
      className={`text-4xl p-6 rounded-xl transition-all border-2 
        ${selected ? "border-cyan-500 bg-slate-700 scale-110" : "border-slate-700 bg-slate-800"}
        ${!disabled && "hover:border-cyan-400 hover:scale-105 active:scale-95"}
        ${disabled && !selected && "opacity-50"}`}>
      <span>{icons[type]}</span>
      <p className="text-xs mt-2 uppercase font-bold text-gray-400">{type}</p>
    </button>
  );
};
export default ChoiceCard;
