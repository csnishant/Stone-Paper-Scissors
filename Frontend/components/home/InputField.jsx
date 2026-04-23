const InputField = ({ label, value, onChange, placeholder }) => (
  <div className="flex flex-col gap-1 w-full">
    <label className="text-sm font-semibold text-gray-400">{label}</label>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="bg-slate-800 border border-slate-700 p-3 rounded-lg outline-none focus:border-cyan-500 transition-all text-white"
    />
  </div>
);

export default InputField;
