import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import GamePage from "../pages/GamePage";
import History from "../pages/History";
import HowToPlay from "../components/home/HowToPlay";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/history" element={<History />} />
        <Route path="/rules" element={<HowToPlay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
