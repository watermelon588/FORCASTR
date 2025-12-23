import React from 'react'
import Weather from '../components/Weather'
import assets from '../assets/assets'

const Home = ({ theme, nextTheme }) => {
  return (
    <div >
      <button
          onClick={nextTheme}
          className="px-2 py-1 rounded-full bg-white/20 backdrop-blur text-white absolute top-8 right-10 border border-solid-white/40 shadow-[0_5px_10px_rgba(0,0,0,0.45)] cursor-pointer transition-all duration-200 ease-out
          hover:scale-106 z-1"
        >
          <i className={`fa-solid ${theme.icon}`}></i>
        </button>
      <div className="absolute top-8 left-10 select-none">
        <img 
        className="w-40 "
        src={assets.LOGO} />
        <p className="text-white/70 text-md tracking-[0.50em] mt-1">
          Feel the forecast.
        </p>
      </div>
      <Weather theme={theme}></Weather>
      <p className='absolute bottom-8 right-10 select-none tracking-[0.50em] text-white/70 text-xs'>BY ROHIT</p>
    </div>
  )
}

export default Home
