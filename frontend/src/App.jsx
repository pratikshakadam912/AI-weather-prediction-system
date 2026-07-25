import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import History from "./components/History";
// import AIPrediction from "./components/AIPrediction";
// import Analytics from "./components/Analytics";
// import Settings from "./components/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History />} />

      {/* Future Pages */}
      {/* <Route path="/prediction" element={<AIPrediction />} /> */}
      {/* <Route path="/analytics" element={<Analytics />} /> */}
      {/* <Route path="/settings" element={<Settings />} /> */}
    </Routes>
  );
}

export default App;
