import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import weatherImage from "../assets/weather.png";
export default function WeatherAdvisor() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  
  const [language, setLanguage] = useState(
  localStorage.getItem("language") || "English"
);

useEffect(() => {
  const handleLanguageChange = () => {
    setLanguage(
      localStorage.getItem("language") || "English"
    );
  };

  window.addEventListener(
    "languageChanged",
    handleLanguageChange
  );

  return () =>
    window.removeEventListener(
      "languageChanged",
      handleLanguageChange
    );
}, []);

const translations = {
  English: {
    title: "🌦 Weather Advisory",
    subtitle: "AI Powered Weather Guidance",
    placeholder: "Enter City",
    button: "Check Weather",
    temperature: "Temperature",
    humidity: "Humidity",
    condition: "Condition",
    weatherBadge1: " Real-Time Weather",
weatherBadge2: " Smart Farming",
weatherBadge3: " Temperature",
weatherBadge4: " Humidity",
weatherBadge5: "Weather Forecast",

weatherDesc:
  "Get real-time weather conditions, temperature, humidity and farming insights to make smarter agricultural decisions.",
  },

  Telugu: {
    title: "🌦 వాతావరణ సలహా",
    subtitle: "ఏఐ ఆధారిత వాతావరణ మార్గదర్శకం",
    placeholder: "నగరాన్ని నమోదు చేయండి",
    button: "వాతావరణాన్ని చూడండి",
    temperature: "ఉష్ణోగ్రత",
    humidity: "తేమ",
    condition: "వాతావరణ పరిస్థితి",
    weatherBadge1: " ప్రత్యక్ష వాతావరణం",
weatherBadge2: " స్మార్ట్ వ్యవసాయం",
weatherBadge3: " ఉష్ణోగ్రత",
weatherBadge4: " తేమ",
weatherBadge5: " వాతావరణ అంచనా",

weatherDesc:
  "తక్షణ వాతావరణ సమాచారం, ఉష్ణోగ్రత, తేమ మరియు వ్యవసాయ సూచనలను పొందండి.",
  },

  Hindi: {
    title: "🌦 मौसम सलाह",
    subtitle: "एआई आधारित मौसम मार्गदर्शन",
    placeholder: "शहर दर्ज करें",
    button: "मौसम देखें",
    temperature: "तापमान",
    humidity: "नमी",
    condition: "मौसम स्थिति",
    weatherBadge1: " रियल-टाइम मौसम",
weatherBadge2: " स्मार्ट खेती",
weatherBadge3: " तापमान",
weatherBadge4: " नमी",
weatherBadge5: " मौसम पूर्वानुमान",

weatherDesc:
  "तापमान, नमी और कृषि सलाह सहित रियल-टाइम मौसम जानकारी प्राप्त करें।",
  },
};

const t = translations[language];

  const getWeather = async () => {
    try {
      const apiKey = "fe94d8ee36c3b7b13a938124aaddf566";

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      const data = await res.json();

      setWeather(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
  <>
    <Navbar />
    <div className="min-h-screen bg-[#F8FFF8] p-10">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-3xl shadow-lg">

  {/* Hero Section */}

  <div className="flex justify-between items-center mb-8">

    <div>

      <h1 className="text-5xl font-bold text-green-700 mb-4">
        {t.title}
      </h1>

      <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full inline-block font-semibold mb-4">
        ☀️ {t.weatherBadge1} • 🌾 {t.weatherBadge2}
      </div>

      <p className="text-gray-600 max-w-2xl">
        {t.weatherDesc}
      </p>

      <div className="flex gap-3 flex-wrap mt-4">

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
          🌡 {t.weatherBadge3}
        </span>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
          💧 {t.weatherBadge4}
        </span>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
          ☁ {t.weatherBadge5}
        </span>

      </div>

    </div>

    <img
      src={weatherImage}
      alt="Weather"
      className="w-72 drop-shadow-xl"
    />

  </div>
        <h1 className="text-4xl font-bold text-green-700 mb-6">
          🌦 Weather Advisory
        </h1>

        <div className="flex gap-4 mb-6">

  <input
    type="text"
    placeholder={t.placeholder}
    value={city}
    onChange={(e) => setCity(e.target.value)}
    className="flex-1 border border-green-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
  />

  <button
    onClick={getWeather}
    className="bg-green-700 text-white px-8 py-4 rounded-xl hover:bg-green-800 shadow-md"
  >
    {t.button}
  </button>

</div>

        {weather && weather.main && (
          <div className="mt-8 bg-gradient-to-b from-green-50 to-white p-8 rounded-3xl border border-green-200 shadow-inner">
            <h2 className="text-3xl font-bold text-green-700 mb-6">
  📍 {weather.name}
</h2>

<div className="grid md:grid-cols-3 gap-6">

  <div className="bg-white p-6 rounded-2xl shadow">
    <h3 className="text-xl font-bold mb-2">
      🌡 {t.temperature}:
    </h3>

    <p className="text-3xl font-bold text-green-700">
      {weather.main.temp}°C
    </p>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow">
    <h3 className="text-xl font-bold mb-2">
      💧 {t.humidity}:
    </h3>

    <p className="text-3xl font-bold text-green-700">
      {weather.main.humidity}%
    </p>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow">
    <h3 className="text-xl font-bold mb-2">
      ☁ {t.condition}:
    </h3>

    <p className="text-xl font-semibold text-green-700 capitalize">
      {weather.weather[0].description}
    </p>
  </div>

</div>
          </div>
        )}

      </div>
    </div>
    </>
  );
}