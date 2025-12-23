const Stat = ({ icon, label, value }) => {
  return (
    <div className="
      flex items-center justify-between
      w-full
      text-md
      tracking-[0.15em]
    ">
      {/* Left side: icon + label */}
      <div className="flex items-center gap-4 text-white/80">
        <i className={`fa-solid fa-${icon}`}></i>
        <span>{label}</span>
      </div>

      {/* Right side: value */}
      <div className="text-white font-medium tracking-normal">
        {value}
      </div>
    </div>
  );
};

export default Stat;
