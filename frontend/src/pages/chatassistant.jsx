import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import agriguruFarmer from "../assets/agriguru-ai-farmer.png";

export default function ChatAssistant() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [listening, setListening] = useState(false);
  const [mode, setMode] = useState("chat");

  const recognitionRef = useRef(null);

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
      title: "🤖 AgriGuru AI Assistant",
      firstQuestion: "🌾 Welcome to AgriGuru. Ask any farming question or use voice assistance.",
      placeholder: "Ask a farming question...",
      askButton: "Ask AI",
      thinking: "Thinking...",
      farmer: "👨 Farmer",
      ai: "🤖 AgriGuru",
      badge: "🌾 Smart Farming Assistant • AI Powered",
description:
  "Chat or talk with AgriGuru for crop guidance, disease diagnosis and weather-based farming advice.",
chatMode: "💬 Chat with AgriGuru",
voiceMode: " 🎤Talk to AgriGuru",
consult: "🌾 Consult AgriGuru",
listening: "🎙️ Listening...",
tapToSpeak: "Tap microphone and speak",
startSpeaking: "Start speaking to AgriGuru...",
    },

    Telugu: {
      title: "🤖 అగ్రిగురు ఏఐ సహాయకుడు",
      firstQuestion: "మీ మొదటి వ్యవసాయ ప్రశ్న అడగండి...",
      placeholder: "వ్యవసాయ ప్రశ్న అడగండి...",
      askButton: "ఏఐని అడగండి",
      thinking: "ఆలోచిస్తోంది...",
      farmer: "👨 రైతు",
      ai: "🤖 అగ్రిగురు",
      badge: "🌾 స్మార్ట్ వ్యవసాయ సహాయకుడు • ఏఐ ఆధారితం",
description:
  "పంటల మార్గదర్శకత్వం, వ్యాధి నిర్ధారణ మరియు వాతావరణ సలహాల కోసం అగ్రిగురుతో చాట్ చేయండి లేదా మాట్లాడండి.",
chatMode: "💬 అగ్రిగురుతో చాట్ చేయండి",
voiceMode: " 🎤అగ్రిగురుతో మాట్లాడండి",
consult: "🌾 అగ్రిగురును సంప్రదించండి",
listening: "🎙️ వింటోంది...",
tapToSpeak: "మైక్రోఫోన్ నొక్కి మాట్లాడండి",
startSpeaking: "అగ్రిగురుతో మాట్లాడడం ప్రారంభించండి...",
    },

    Hindi: {
  title: "🤖 एग्रीगुरु एआई सहायक",
  firstQuestion:
    "🌾 एग्रीगुरु में आपका स्वागत है। कोई भी कृषि प्रश्न पूछें या वॉइस सहायता का उपयोग करें।",

  placeholder: "कृषि से जुड़ा प्रश्न पूछें...",

  askButton: "एआई से पूछें",

  thinking: "सोच रहा है...",

  farmer: "👨 किसान",

  ai: "🤖 एग्रीगुरु",

  badge: "🌾 स्मार्ट कृषि सहायक • एआई संचालित",

  description:
    "फसल मार्गदर्शन, रोग पहचान और मौसम सलाह के लिए एग्रीगुरु से चैट करें या बात करें।",

  chatMode: "💬 एग्रीगुरु से चैट करें",

  voiceMode: "🎤 एग्रीगुरु से बात करें",

  consult: "🌾 एग्रीगुरु से सलाह लें",

  listening: "🎙️ सुन रहा है...",

  tapToSpeak: "माइक्रोफोन दबाकर बोलें",

  startSpeaking: "एग्रीगुरु से बात शुरू करें...",
},
  };

  const t = translations[language];

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported.");
      return;
    }

    const recognition = new SpeechRecognition();

    if (language === "Telugu") {
      recognition.lang = "te-IN";
    } else if (language === "Hindi") {
      recognition.lang = "hi-IN";
    } else {
      recognition.lang = "en-US";
    }

    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onresult = async (event) => {
      const transcript =
        event.results[0][0].transcript;

      setMessage(transcript);

      if (mode === "voice") {
        sendMessageDirect(transcript);
      }
    };

    recognition.start();

    recognitionRef.current = recognition;
  };

  const speakResponse = (text) => {
    const speech =
      new SpeechSynthesisUtterance(text);

    if (language === "Telugu") {
      speech.lang = "te-IN";
    } else if (language === "Hindi") {
      speech.lang = "hi-IN";
    } else {
      speech.lang = "en-US";
    }

    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  };

  const sendMessageDirect = async (userMessage) => {
    try {
      setLoading(true);

      const selectedLanguage =
        localStorage.getItem("language") || "English";

      setChatHistory((prev) => [
        ...prev,
        {
          type: "user",
          text: userMessage,
        },
      ]);

      const res = await axios.post(
        "http://localhost:5000/api/chat",
        {
          message: userMessage,
          language: selectedLanguage,
        }
      );

      setChatHistory((prev) => [
        ...prev,
        {
          type: "ai",
          text: res.data.response,
        },
      ]);

      speakResponse(res.data.response);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setMessage("");

    sendMessageDirect(userMessage);

    const aiCount =
      Number(localStorage.getItem("aiQuestions")) || 0;

    localStorage.setItem(
      "aiQuestions",
      aiCount + 1
    );
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#F8FFF8] p-10">
        <div className="max-w-5xl mx-auto bg-gradient-to-br
from-white
to-green-50
p-8
rounded-3xl
shadow-xl
border
border-green-100">

          <h1 className="text-3xl font-bold text-green-700 mb-6">
            {t.title}
           <div className="relative mb-4">

  <div>
    <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full inline-block font-semibold mb-3">
      {t.badge}
    </div>

  </div>

  <img
    src={agriguruFarmer}
    alt="AgriGuru"
   className="
absolute
right-0
top-[-40px]
w-[260px]
animate-pulse
"
  />

</div>
          </h1>
          <div className="flex gap-4 mb-6 mt-2">

            <button
              onClick={() => setMode("chat")}
              className={`px-6 py-3 rounded-xl ${
                mode === "chat"
                  ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg"
                  : "bg-gray-200"
              }`}
            >
              {t.chatMode}
            </button>

            <button
              onClick={() => setMode("voice")}
              className={`px-6 py-3 rounded-xl ${
                mode === "voice"
                  ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg"
                  : "bg-gray-200"
              }`}
            >
            {t.voiceMode}
            </button>

          </div>

          {mode === "chat" && (
            <>
              <div className="h-[500px] overflow-y-auto rounded-3xl p-6 mb-4 bg-gradient-to-b from-green-50 to-white border border-green-100 shadow-inner">
                

{chatHistory.length === 0 && (
  <div className="text-center mt-20">
    <h2 className="text-3xl font-bold text-green-700">
      🌾 Ask AgriGuru Anything
    </h2>

    <p className="text-gray-500 mt-3">
      Crop Diseases • Weather • Fertilizers • Farming Tips
    </p>
  </div>
)}
                {chatHistory.map((chat, index) => (
                  <div
                    key={index}
                    className={`mb-4 p-4 rounded-xl ${
                      chat.type === "user"
                       ? "bg-gradient-to-r from-green-500 to-green-600 text-white ml-auto max-w-[80%]"
                       : "bg-white border border-green-200 shadow-md max-w-[80%]"
                    }`}
                  >
                    <strong>
                      {chat.type === "user"
                        ? t.farmer
                        : t.ai}
                    </strong>

                    <p className="mt-2 whitespace-pre-wrap">
                      {chat.text}
                    </p>
                  </div>
                ))}

              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.placeholder}
                className="w-full border border-green-200 p-4 rounded-2xl h-28 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <button
  onClick={sendMessage}
  className="bg-green-700 text-white px-8 py-3 rounded-2xl hover:bg-green-800 shadow-md"
>
  {loading ? t.thinking : t.consult}
</button>
            </>
          )}
        {mode === "voice" && (
  <div className="py-10">

    <div className="max-h-[500px] overflow-y-auto rounded-3xl p-6 bg-gradient-to-b from-green-50 to-white border border-green-100">
      <div className="text-center mt-6">

  <button
    onClick={startListening}
    className="bg-green-700 text-white px-8 py-3 rounded-2xl hover:bg-green-800 shadow-md"
  >
    {listening ? t.listening : " " + t.voiceMode}
  </button>

</div>
      {chatHistory.length === 0 && (
        <p className="text-gray-500 text-center">
          {t.startSpeaking}
        </p>
      )}

      {chatHistory.map((chat, index) => (
        <div
          key={index}
          className={`mb-5 p-5 rounded-3xl shadow-sm ${
            chat.type === "user"
              ? "bg-green-100 ml-auto max-w-[80%]"
              : "bg-white border max-w-[80%]"
          }`}
        >
          <div className="flex items-start justify-between mb-2">
  <span className="text-xl">
    {chat.type === "user" ? "👨‍🌾" : "🤖"}
  </span>

  <span className="font-bold text-green-700">
    {chat.type === "user"
      ? t.farmer
      : t.ai}
  </span>
</div>

          <p className="mt-2 whitespace-pre-wrap">
            {chat.text}
          </p>
        </div>
      ))}

    </div>

  </div>
)}
        

        </div>
      </div>
    </>
  );
}