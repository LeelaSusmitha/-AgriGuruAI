import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import agriguruFarmer from "../assets/agriguru-ai-farmer.png";

export default function Dashboard() {
  const aiQuestions =
    localStorage.getItem("aiQuestions") || 0;

  const cropAnalyses =
    localStorage.getItem("cropAnalyses") || 0;

  const imagesUploaded =
    localStorage.getItem("imagesUploaded") || 0;

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

const totalActivity =
  Number(aiQuestions) +
  Number(cropAnalyses) +
  Number(imagesUploaded);

  const translations = {
    English: {
      title: "📊 AgriGuru Dashboard",
      aiQuestions: "AI Questions",
      cropAnalyses: "Crop Analyses",
      imagesUploaded: "Images Uploaded",
      totalActivity: "Total Activity",
overview: "AgriGuru Usage Overview",
quickActions: "Quick Actions",
heroText:
  "Track your AI consultations, crop analyses and platform activity.",
  insightDesc:
  "AgriGuru helps farmers through AI consultations, crop disease analysis and weather-based recommendations. Continue using AgriGuru regularly to receive smarter farming guidance and improve decision making.",
  insightsTitle: "Farming Insights",
    },

    Telugu: {
      title: "📊 అగ్రిగురు డాష్‌బోర్డ్",
      aiQuestions: "ఏఐ ప్రశ్నలు",
      cropAnalyses: "పంట విశ్లేషణలు",
      imagesUploaded: "అప్లోడ్ చేసిన చిత్రాలు",
      totalActivity: "మొత్తం కార్యకలాపాలు",
overview: "అగ్రిగురు వినియోగ అవలోకనం",
quickActions: "త్వరిత చర్యలు",
insightsTitle: "వ్యవసాయ సూచనలు",
heroText:
  "మీ AI సంప్రదింపులు, పంట విశ్లేషణలు మరియు వినియోగాన్ని ట్రాక్ చేయండి.",
  insightDesc:
  "అగ్రిగురు రైతులకు ఏఐ సంప్రదింపులు, పంట వ్యాధి విశ్లేషణ మరియు వాతావరణ ఆధారిత సూచనలను అందిస్తుంది. మెరుగైన వ్యవసాయ నిర్ణయాల కోసం అగ్రిగురును ఉపయోగించడం కొనసాగించండి.",
    },

    Hindi: {
      title: "📊 एग्रीगुरु डैशबोर्ड",
      aiQuestions: "एआई प्रश्न",
      cropAnalyses: "फसल विश्लेषण",
      imagesUploaded: "अपलोड की गई तस्वीरें",
      totalActivity: "कुल गतिविधि",
overview: "एग्रीगुरु उपयोग अवलोकन",
quickActions: "त्वरित कार्य",
insightsTitle: "कृषि अंतर्दृष्टि",
heroText:
  "अपने एआई परामर्श, फसल विश्लेषण और गतिविधि को ट्रैक करें।",
  insightDesc:
  "एग्रीगुरु किसानों को एआई परामर्श, फसल रोग विश्लेषण और मौसम आधारित सुझाव प्रदान करता है। बेहतर कृषि निर्णयों के लिए इसका नियमित उपयोग करें।",
    },
  };

  const t = translations[language];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#F8FFF8] p-10">

  {/* Hero Section */}

  <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg p-8 mb-10">

    <div className="flex justify-between items-center">

      <div>

        <h1 className="text-5xl font-bold text-green-700 mb-4">
          {t.title}
        </h1>

        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full inline-block font-semibold mb-4">
          📈 Smart Farming Insights • Real-Time Analytics
        </div>

        <p className="text-gray-600 text-lg max-w-2xl">
          {t.heroText}
        </p>

      </div>

      <img
        src={agriguruFarmer}
        alt="AgriGuru"
        className="w-44"
      />

    </div>

  </div>

  {/* Stats Cards */}

  <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-10">

    <div className="bg-green-50 rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition-all">

      <h2 className="text-5xl">🤖</h2>

      <h3 className="font-bold text-xl mt-3">
        {t.aiQuestions}
      </h3>

      <p className="text-4xl font-bold text-green-700 mt-4">
        {aiQuestions}
      </p>

    </div>

    <div className="bg-yellow-50 rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition-all">

      <h2 className="text-5xl">🌾</h2>

      <h3 className="font-bold text-xl mt-3">
        {t.cropAnalyses}
      </h3>

      <p className="text-4xl font-bold text-green-700 mt-4">
        {cropAnalyses}
      </p>

    </div>

    <div className="bg-blue-50 rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition-all">

      <h2 className="text-5xl">📷</h2>

      <h3 className="font-bold text-xl mt-3">
        {t.imagesUploaded}
      </h3>

      <p className="text-4xl font-bold text-green-700 mt-4">
        {imagesUploaded}
      </p>

    </div>

    <div className="bg-purple-50 rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition-all">

      <h2 className="text-5xl">⚡</h2>

      <h3 className="font-bold text-xl mt-3">
        {t.totalActivity}
      </h3>

      <p className="text-4xl font-bold text-green-700 mt-4">
        {totalActivity}
      </p>

    </div>

  </div>

  {/* Usage Overview */}

  <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg p-8 mb-10">

    <h2 className="text-3xl font-bold text-green-700 mb-6">
      🌱 {t.overview}
    </h2>

    <div className="space-y-5">

      <div>
        <p className="font-semibold mb-2">
          {t.aiQuestions}
        </p>

        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-600 h-4 rounded-full"
            style={{ width: "70%" }}
          ></div>
        </div>
      </div>

      <div>
        <p className="font-semibold mb-2">
          {t.cropAnalyses}
        </p>

        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-yellow-500 h-4 rounded-full"
            style={{ width: "60%" }}
          ></div>
        </div>
      </div>

      <div>
        <p className="font-semibold mb-2">
          {t.imagesUploaded}
        </p>

        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: "50%" }}
          ></div>
        </div>
      </div>

    </div>

  </div>

<div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg p-8">

  <h2 className="text-3xl font-bold text-green-700 mb-4">
     🌱 {t.insightsTitle}
  </h2>

  <p className="text-gray-600 leading-relaxed">
     {t.insightDesc}
  </p>

</div>

  </div>
    </>
  );
}