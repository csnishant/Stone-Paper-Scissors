import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import GamePage from "../pages/GamePage";
import History from "../pages/History";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
