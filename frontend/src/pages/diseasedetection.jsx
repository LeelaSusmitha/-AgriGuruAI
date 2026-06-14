import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar";


export default function DiseaseDetection() {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [cropName, setCropName] = useState("");
  const [problem, setProblem] = useState("");

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

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
      title: "🌾 AI Crop Disease Detection<br/>Upload crop images and receive AI-powered disease diagnosis,<br/> causes, treatment recommendations,<br/>and prevention tips.",
      cropName: "Crop Name",
      cropPlaceholder: "e.g. Tomato, Rice, Mango",
      problem: "Describe the Problem",
      problemPlaceholder:
        "Example: Leaves are turning yellow and curling.",
      upload: "Upload Crop Image",
      analyze: "🔍 Analyze Crop",
      analyzing: "Analyzing...",
      result: "Analysis Result",
      uploadAlert: "Please upload an image",
      failed: "❌ Failed to analyze crop image.",
      heroTitle: "🌾 AI Crop Disease Detection",
badge1: "🦠 Disease Detection",
badge2: " AI Powered",
heroDesc:
  "Upload crop images and receive AI-powered disease diagnosis, possible causes, treatment recommendations, and prevention tips to keep your crops healthy and productive.",
treatment: " Treatment Advice",
analysis: " Image Analysis",
instant: " Instant Results",
uploadBtn: "📷 Upload Image",
analyzeBtn: "🔍 Analyze Crop",

    },

    Telugu: {
      title: "🌾 పంట వ్యాధి గుర్తింపు",
      cropName: "పంట పేరు",
      cropPlaceholder: "ఉదా: టమోటా, వరి, మామిడి",
      problem: "సమస్యను వివరించండి",
      problemPlaceholder:
        "ఉదాహరణ: ఆకులు పసుపు రంగులోకి మారుతున్నాయి.",
      upload: "పంట చిత్రాన్ని అప్లోడ్ చేయండి",
      analyze: "🔍 పంటను విశ్లేషించండి",
      analyzing: "విశ్లేషిస్తోంది...",
      result: "విశ్లేషణ ఫలితం",
      uploadAlert: "దయచేసి ఒక చిత్రాన్ని అప్లోడ్ చేయండి",
      failed: "❌ పంట విశ్లేషణ విఫలమైంది.",
      heroTitle: "🌾 ఏఐ పంట వ్యాధి గుర్తింపు",
badge1: "వ్యాధి గుర్తింపు",
badge2: " ఏఐ ఆధారితం",
heroDesc:
  "పంట చిత్రాలను అప్లోడ్ చేసి వ్యాధి నిర్ధారణ, కారణాలు, చికిత్స సూచనలు మరియు నివారణ మార్గాలను పొందండి.",
treatment: " చికిత్స సూచనలు",
analysis: " చిత్రం విశ్లేషణ",
instant: " తక్షణ ఫలితాలు",
uploadBtn: "📷 చిత్రం అప్లోడ్ చేయండి",
analyzeBtn: "🔍 పంటను విశ్లేషించండి",
    },

    Hindi: {
      title: "🌾 फसल रोग पहचान",
      cropName: "फसल का नाम",
      cropPlaceholder: "जैसे: टमाटर, धान, आम",
      problem: "समस्या का विवरण",
      problemPlaceholder:
        "उदाहरण: पत्तियां पीली हो रही हैं।",
      upload: "फसल की तस्वीर अपलोड करें",
      analyze: "🔍 फसल का विश्लेषण करें",
      analyzing: "विश्लेषण हो रहा है...",
      result: "विश्लेषण परिणाम",
      uploadAlert: "कृपया एक तस्वीर अपलोड करें",
      failed: "❌ फसल विश्लेषण विफल हुआ।",
      heroTitle: "🌾 एआई फसल रोग पहचान",
badge1: " रोग पहचान",
badge2: " एआई संचालित",
heroDesc:
  "फसल की तस्वीर अपलोड करें और रोग निदान, कारण, उपचार सुझाव तथा रोकथाम उपाय प्राप्त करें।",
treatment: " उपचार सलाह",
analysis: " चित्र विश्लेषण",
instant: " तुरंत परिणाम",
uploadBtn: "📷 चित्र अपलोड करें",
analyzeBtn: "🔍 फसल विश्लेषण करें",
    },
  };

  const t = translations[language];

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleAnalyze = async () => {
    if (!imageFile) {
      alert(t.uploadAlert);
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("image", imageFile);
      formData.append("cropName", cropName);
      formData.append("problem", problem);

      const res = await axios.post(
        "http://localhost:5000/api/chat/analyze-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(res.data.result);

      const analysisCount =
        Number(localStorage.getItem("cropAnalyses")) || 0;

      localStorage.setItem(
        "cropAnalyses",
        analysisCount + 1
      );

      const imageCount =
        Number(localStorage.getItem("imagesUploaded")) || 0;

      localStorage.setItem(
        "imagesUploaded",
        imageCount + 1
      );

    } catch (error) {
      console.error(error);
      setResult(t.failed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#F8FFF8] p-10">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-10 mb-8 text-center">

  <h1 className="text-5xl font-bold text-green-700 mb-4">
     {t.heroTitle}
  </h1>

  <div className="bg-green-100 text-green-700 px-5 py-2 rounded-full inline-block font-semibold mb-5">
    🦠 {t.badge1} • 🤖 {t.badge2}
  </div>

  <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed mb-6">
     {t.heroDesc}
  </p>

  <div className="flex justify-center gap-3 flex-wrap">

    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
      🌱 {t.treatment}
    </span>

    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
      📸 {t.analysis}
    </span>

    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
      ⚡ {t.instant}
    </span>

    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
      🤖 {t.badge2}
    </span>

  </div>

</div>

        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-8">

          <label className="block mb-2 text-lg font-semibold">
            {t.cropName}
          </label>

          <input
            type="text"
            placeholder={t.cropPlaceholder}
            value={cropName}
            onChange={(e) => setCropName(e.target.value)}
            className="w-full border p-3 rounded-xl mb-6"
          />

          <label className="block mb-2 text-lg font-semibold">
            {t.problem}
          </label>

          <textarea
            placeholder={t.problemPlaceholder}
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            className="w-full border p-3 rounded-xl h-32 mb-6"
          />

          <label className="block mb-3 text-lg font-semibold">
  {t.upload}
</label>

<input
  id="cropImage"
  type="file"
  accept="image/*"
  onChange={handleImageChange}
  className="hidden"
/>

<div className="flex gap-4 flex-wrap mb-6">

  <label
    htmlFor="cropImage"
    className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 shadow-md"
  >
     {t.uploadBtn}
  </label>

  <button
    onClick={handleAnalyze}
    className="bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800 shadow-md"
  >
    {loading ? t.analyzing : ` ${t.analyzeBtn}`}
  </button>

</div>

{imageFile && (
  <div className="mb-6 text-green-700 font-medium">
    ✅ {imageFile.name}
  </div>
)}

          {image && (
            <div className="mb-8">
              <img
                src={image}
                alt="Preview"
                className="w-full max-h-[400px] object-contain rounded-2xl border"
              />
            </div>
          )}

          {result && (
            <div className="mt-10 bg-gradient-to-b from-green-50 to-white p-8 rounded-3xl border border-green-200 shadow-inner">
             <h2 className="text-3xl font-bold text-green-700 mb-4">
  🤖 {t.result}
</h2>

              <pre className="whitespace-pre-wrap text-gray-700">
                {result}
              </pre>
            </div>
          )}

        </div>
      </div>
    </>
  );
}