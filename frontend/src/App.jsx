import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import DiseaseDetection from "./pages/diseasedetection";
import ChatAssistant from "./pages/chatassistant";
import WeatherAdvisor from "./pages/weatheradvisor";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/disease" element={<DiseaseDetection />} />
        <Route path="/chat" element={<ChatAssistant />} />
        <Route path="/weather" element={<WeatherAdvisor />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;