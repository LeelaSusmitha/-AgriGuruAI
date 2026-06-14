import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Features() {
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
      featuresTitle: "Our Features",
      whyTitle: "Why Choose AgriGuru?",
      disclaimerTitle: "⚠ AI Advisory Disclaimer",
      disclaimerText:
        "AgriGuru provides AI-generated recommendations based on crop images, weather information, and farmer inputs. These recommendations are intended for guidance purposes only. Farmers should consult local agricultural experts before applying pesticides, fertilizers, or major treatments.",

      features: [
        {
          title: "AI Crop Diagnosis",
          desc: "Upload crop images and identify plant diseases instantly.",
          icon: "📷",
          route: "/disease",
        },
        {
          title: "Talk with AgriGuru",
          desc: "Ask farming questions and receive AI-powered guidance.",
          icon: "🤖",
          route: "/chat",
        },
        {
          title: "Smart Weather Advisory",
          desc: "Get weather-based recommendations for better decisions.",
          icon: "🌦",
          route: "/weather",
        },
      ],

      benefits: [
        "Multi-Language Support",
        "Voice Assistant",
        "AI Powered Advice",
        "Instant Analysis",
      ],
    },

    Telugu: {
      featuresTitle: "మా ప్రత్యేకతలు",
      whyTitle: "అగ్రిగురునే ఎందుకు ఎంచుకోవాలి?",
      disclaimerTitle: "⚠ ఏఐ సలహా నిరాకరణ",
      disclaimerText:
        "అగ్రిగురు పంట చిత్రాలు, వాతావరణ సమాచారం మరియు రైతు వివరాల ఆధారంగా ఏఐ సిఫార్సులు అందిస్తుంది. ఇవి మార్గదర్శక ప్రయోజనాల కోసం మాత్రమే. ఎరువులు లేదా పురుగుమందులు ఉపయోగించే ముందు వ్యవసాయ నిపుణులను సంప్రదించండి.",

      features: [
        {
          title: "ఏఐ పంట వ్యాధి నిర్ధారణ",
          desc: "పంట చిత్రాలను అప్‌లోడ్ చేసి వెంటనే వ్యాధులను గుర్తించండి.",
          icon: "📷",
          route: "/disease",
        },
        {
          title: "అగ్రిగురుతో మాట్లాడండి",
          desc: "వ్యవసాయ ప్రశ్నలు అడిగి ఏఐ సలహా పొందండి.",
          icon: "🤖",
          route: "/chat",
        },
        {
          title: "స్మార్ట్ వాతావరణ సలహా",
          desc: "వాతావరణ ఆధారిత సూచనలతో మంచి నిర్ణయాలు తీసుకోండి.",
          icon: "🌦",
          route: "/weather",
        },
      ],

      benefits: [
        "బహుభాషా మద్దతు",
        "వాయిస్ సహాయకుడు",
        "ఏఐ ఆధారిత సలహా",
        "తక్షణ విశ్లేషణ",
      ],
    },

    Hindi: {
      featuresTitle: "हमारी विशेषताएँ",
      whyTitle: "AgriGuru क्यों चुनें?",
      disclaimerTitle: "⚠ एआई सलाह अस्वीकरण",
      disclaimerText:
        "AgriGuru फसल चित्रों, मौसम की जानकारी और किसान इनपुट के आधार पर एआई सुझाव प्रदान करता है। ये केवल मार्गदर्शन हेतु हैं। किसी भी उर्वरक या कीटनाशक के उपयोग से पहले कृषि विशेषज्ञ से सलाह लें।",

      features: [
        {
          title: "एआई फसल निदान",
          desc: "फसल की तस्वीर अपलोड करें और रोगों की पहचान करें।",
          icon: "📷",
          route: "/disease",
        },
        {
          title: "AgriGuru से बात करें",
          desc: "कृषि प्रश्न पूछें और एआई मार्गदर्शन प्राप्त करें।",
          icon: "🤖",
          route: "/chat",
        },
        {
          title: "स्मार्ट मौसम सलाह",
          desc: "मौसम आधारित सुझावों से बेहतर निर्णय लें।",
          icon: "🌦",
          route: "/weather",
        },
      ],

      benefits: [
        "बहुभाषी सहायता",
        "वॉइस असिस्टेंट",
        "एआई आधारित सलाह",
        "तुरंत विश्लेषण",
      ],
    },
  };

  const t = translations[language];

  const benefitIcons = ["🌍", "🎤", "🤖", "⚡"];

  return (
    <section className="px-10 py-10 max-w-7xl mx-auto">

      <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
        {t.featuresTitle}
      </h2>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {t.features.map((feature, index) => (
          <div
            key={index}
            onClick={() => navigate(feature.route)}
            className="bg-white p-8 rounded-3xl shadow-lg cursor-pointer border border-green-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          >
            <div className="text-5xl mb-4">
              {feature.icon}
            </div>

            <h3 className="text-2xl font-bold mb-3">
              {feature.title}
            </h3>

            <p className="text-gray-600 leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>

      <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
        {t.whyTitle}
      </h2>

      <div className="grid md:grid-cols-4 gap-6 mb-20">
        {t.benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-3xl shadow-md text-center"
          >
            <div className="text-5xl mb-4">
              {benefitIcons[index]}
            </div>

            <h3 className="font-bold text-lg">
              {benefit}
            </h3>
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 border border-yellow-300 rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-yellow-700 mb-4">
          {t.disclaimerTitle}
        </h2>

        <p className="text-gray-700 leading-relaxed">
          {t.disclaimerText}
        </p>
      </div>

    </section>
  );
}