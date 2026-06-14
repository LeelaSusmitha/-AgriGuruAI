import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Hero() {
  const navigate = useNavigate();

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
      badge: "🌾 AI Powered Agriculture Assistant",
      title: "🌾 Empowering Farmers",
      title2: "with Artificial Intelligence",
      description:
        "Empowering farmers with AI-driven crop disease detection, real-time weather insights, multilingual assistance, and voice-enabled farming support.",
      multiLang: "🌍 Multi-Language",
      voice: "🎤 Voice Enabled",
      ai: "🤖 AI Powered",
      button: "🤖 Talk with AgriGuru",
    },

    Telugu: {
      badge: "🌾 ఏఐ ఆధారిత వ్యవసాయ సహాయకుడు",
      title: "🌾 రైతులను శక్తివంతం చేస్తూ",
      title2: "కృత్రిమ మేధస్సుతో",
      description:
        "ఏఐ ఆధారిత పంట వ్యాధి గుర్తింపు, తక్షణ వాతావరణ సమాచారం, బహుభాషా సహాయం మరియు వాయిస్ సపోర్ట్ ద్వారా రైతులకు సహాయం.",
      multiLang: "🌍 బహుభాషా మద్దతు",
      voice: "🎤 వాయిస్ సపోర్ట్",
      ai: "🤖 ఏఐ ఆధారితం",
      button: "🤖 అగ్రిగురుతో మాట్లాడండి",
    },

    Hindi: {
      badge: "🌾 एआई आधारित कृषि सहायक",
      title: "🌾 किसानों को सशक्त बनाना",
      title2: "कृत्रिम बुद्धिमत्ता के साथ",
      description:
        "एआई आधारित फसल रोग पहचान, रियल-टाइम मौसम जानकारी, बहुभाषी सहायता और वॉइस सपोर्ट के साथ किसानों की मदद।",
      multiLang: "🌍 बहुभाषी सहायता",
      voice: "🎤 वॉइस सहायता",
      ai: "🤖 एआई संचालित",
      button: "🤖 एग्रीगुरु से बात करें",
    },
  };

  const t = translations[language];

  return (
    <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center px-8 py-24">
      <div>
        <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold mb-6">
          {t.badge}
        </div>

        <h1 className="text-6xl font-bold text-green-700 mb-6 leading-tight">
          {t.title}
          <br />
          {t.title2}
        </h1>

        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          {t.description}
        </p>

        <div className="flex gap-3 flex-wrap mb-6">
          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
            {t.multiLang}
          </span>

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
            {t.voice}
          </span>

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
            {t.ai}
          </span>
        </div>

        <button
          onClick={() => navigate("/chat")}
          className="bg-green-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-green-800 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {t.button}
        </button>
      </div>

      <div className="flex justify-center items-center">
        <img
          src={new URL("../assets/farmer.png", import.meta.url).href}
          alt="AI Farmer"
          className="
            w-[450px]
            md:w-[550px]
            object-contain
            drop-shadow-2xl
            hover:scale-105
            transition-all
            duration-500
          "
        />
      </div>
    </section>
  );
}