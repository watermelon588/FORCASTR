import React, { useState } from 'react';


const SearchBox = ({onSearch,loading,error,theme}) => {

    const [city, setCity] = useState("");

// handel change function
    const handelChange = ((e)=>{
        setCity(e.target.value);
    });

// handel submit function
    const handelSubmit = ((e)=>{
        e.preventDefault();
        if (!city) return;
        console.log(city);
        onSearch(city);
        setCity("");
    })

  return (
    <div className="w-full flex justify-center">
      <form
        onSubmit={handelSubmit}
        className="relative w-[90%]
          flex items-center gap-4
          px-10 py-3
          rounded-full
          border border-white/30
          bg-white/10 backdrop-blur-md
          shadow-[0_8px_40px_rgba(0,0,0,0.85)]"
      >
        {/* Icon */}
        <span className="text-lg text-white/60">
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>

        {/* Input */}
        <input
          type="text"
          placeholder="Search city ..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={`flex-1 bg-transparent text-white
            outline-none border-none
            placeholder:text-white/60 text-base`}
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="absolute right-6 top-1/2 -translate-y-1/2
            text-white text-sm tracking-widest
            hover:text-white/70 transition
            disabled:opacity-40"
        >
          Search
        </button>
      </form>
      {error && (
        <div
          className="
            absolute
            -top-14           /* 👈 floats above */
            top-full mt-3
            right-[0%]        /* 👈 aligns with search box edge */
            mt-3 px-4 py-2
            rounded-md
            bg-red-500/20
            border border-red-500/40
            text-red-200 text-xs tracking-wide
            flex items-center gap-2
            backdrop-blur-sm
            shadow-lg
          "
        >
          <i className="fa-solid fa-circle-exclamation"></i>
          {error}
       </div>
  )}
  </div>
  );
};

export default SearchBox
