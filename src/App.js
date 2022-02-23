import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [mode, setMode] = useState("light");

  const changeMode = (mode) => {
    setMode(mode);
  };

  return (
    <div className={`${mode}`}>
      <div className="App dark:bg-gray-800 h-screen w-100">
        <Navbar mode={mode} changeMode={changeMode} />
      </div>
    </div>
  );
}

export default App;
