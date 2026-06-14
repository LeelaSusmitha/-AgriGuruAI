import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "English"
  );

  useEffect(() => {
  localStorage.setItem("language", language);

  window.dispatchEvent(
    new Event("languageChanged")
  );
}, [language]);
  const translations = {
    English: {
      home: "Home",
      chat: "AI Chat",
      disease: "Disease Detection",
      weather: "Weather",
      dashboard: "Dashboard",
    },

    Telugu: {
      home: "హోమ్",
      chat: "ఏఐ చాట్",
      disease: "వ్యాధి గుర్తింపు",
      weather: "వాతావరణం",
      dashboard: "డాష్‌బోర్డ్",
    },

    Hindi: {
      home: "होम",
      chat: "एआई चैट",
      disease: "रोग पहचान",
      weather: "मौसम",
      dashboard: "डैशबोर्ड",
    },
  };

  const t = translations[language];

  const navClass = (path) =>
    location.pathname === path
      ? "bg-green-700 text-white shadow-md"
      : "text-gray-700 hover:bg-green-100 hover:text-green-700";

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-green-100 shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}

        <div
          onClick={() => navigate("/")}
          className="cursor-pointer"
        >
          <h1 className="text-4xl font-extrabold text-green-700 tracking-tight">
            🌾 AgriGuru AI
          </h1>

          <p className="text-xs text-gray-500">
            Smart Farming Assistant
          </p>
        </div>

        {/* Navigation */}

        <div className="flex items-center gap-3 flex-wrap">

          <button
            onClick={() => navigate("/")}
            className={`px-4 py-2 rounded-2xl transition-all duration-300 font-medium ${navClass("/")}`}
          >
            🏠 {t.home}
          </button>

          <button
            onClick={() => navigate("/chat")}
            className={`px-4 py-2 rounded-2xl transition-all duration-300 font-medium ${navClass("/chat")}`}
          >
            🤖 {t.chat}
          </button>

          <button
            onClick={() => navigate("/disease")}
            className={`px-4 py-2 rounded-2xl transition-all duration-300 font-medium ${navClass("/disease")}`}
          >
            🌾 {t.disease}
          </button>

          <button
            onClick={() => navigate("/weather")}
            className={`px-4 py-2 rounded-2xl transition-all duration-300 font-medium ${navClass("/weather")}`}
          >
            🌦 {t.weather}
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className={`px-4 py-2 rounded-2xl transition-all duration-300 font-medium ${navClass("/dashboard")}`}
          >
            📊 {t.dashboard}
          </button>

          {/* Language Selector */}

          <select
            value={language}
            onChange={(e) => {
  localStorage.setItem("language", e.target.value);
  window.location.reload();
}}
            className="ml-3 border border-green-200 rounded-2xl px-4 py-2 bg-white shadow-sm hover:border-green-400 transition-all outline-none"
          >
            <option>English</option>
            <option>Telugu</option>
            <option>Hindi</option>
          </select>

        </div>

      </div>

    </nav>
  );
}