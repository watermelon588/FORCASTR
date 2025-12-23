
import { Routes , Route} from 'react-router-dom'
import { useState } from "react";
import Home from './pages/Home';
import { themes } from '../config/Theme';


function App() {

  const [themeIndex, setThemeIndex] = useState(1);

  const nextTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  };

  const activeTheme = themes[themeIndex];

  return (
    <div>
      <div>
        <img src={activeTheme.bg} alt="background" 
        className="absolute top-0 left-0 w-full h-full object-cover bg-black z-[-1] "/>
        <Routes>
          <Route path='/' element={<Home theme={activeTheme}
              nextTheme={nextTheme}/>}></Route>
        </Routes> 
      </div>
    </div>
  )
}

export default App
