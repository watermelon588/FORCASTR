import React from 'react'

const OptionButton = ({ label, active, onClick }) => {
  return (
    <button
        onClick={onClick}
        className={`flex items-center justify-between px-8 py-4 rounded-full
        border border-white/40 backdrop-blur-2xl transition-all hover:scale-102 duration-200 ease-out active:scale-95
        ${
          active
            ? "bg-white/12 text-white shadow-lg"
            : "bg-black/20 text-white/70 hover:bg-white/12"
        }`}
    >
        <span className="tracking-widest">{label}</span>
        <i className="fa-solid fa-chevron-right"></i>
    </button>
  )
}

export default OptionButton
