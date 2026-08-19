import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Prediction from "./pages/Prediction";

import History from "./components/History";
import Analytics from "./components/Analytics";
// import Settings from "./components/Settings";

function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* AI Prediction */}
      <Route path="/prediction" element={<Prediction />} />

      {/* History */}
      <Route path="/history" element={<History />} />

      {/* Coming next */}
      <Route path="/analytics" element={<Analytics />} />
      {/* <Route path="/settings" element={<Settings />} /> */}
    </Routes>
  );
}

export default App;
