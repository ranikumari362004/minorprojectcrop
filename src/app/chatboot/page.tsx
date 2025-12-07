'use client'
import React, { useState } from "react";
import { UploadCloud, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIResult {
  crop: string;
  disease: string | null;
  confidence: number;
  recommendation: string;
}

export default function CropAnalysisPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<AIResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setResult(null);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setResult(null);

    try {
      // Replace this with actual AI API call
      // Example: send file to backend endpoint /api/analyze
      const formData = new FormData();
      formData.append("image", selectedFile);

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data: AIResult = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Failed to analyze crop image.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-green-100 flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">
        🌱 Crop AI Analysis
      </h1>
      <p className="text-gray-600 mb-8 text-center max-w-lg">
        Upload a photo of your crop, and our AI will detect the type of crop, identify any diseases, 
        and provide recommendations to improve crop health.
      </p>

      {/* Upload Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center">
        {/* Preview */}
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Selected Crop"
            className="w-full h-64 object-cover rounded-xl mb-4 border border-green-100"
          />
        ) : (
          <div className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-green-300 rounded-xl mb-4 text-green-400">
            <UploadCloud className="w-12 h-12 mb-2" />
            <p className="text-center">Drag & drop or click to upload a crop photo</p>
          </div>
        )}

        {/* File Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4"
        />

        {/* Upload Button */}
        <Button
          
          className="w-full flex items-center justify-center gap-2"
          onClick={handleUpload}
          disabled={!selectedFile || loading}
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Analyze Crop"}
        </Button>

        {/* Result */}
        {result && (
          <div className="mt-6 w-full bg-green-50 border border-green-200 rounded-2xl p-6 shadow-inner">
            <h2 className="text-xl font-semibold text-green-700 mb-2">
              {result.crop} Analysis
            </h2>
            <p className="text-gray-700 mb-1">
              Disease:{" "}
              {result.disease ? (
                <span className="text-red-600 font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" /> {result.disease}
                </span>
              ) : (
                <span className="text-green-600 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Healthy
                </span>
              )}
            </p>
            <p className="text-gray-700 mb-1">
              Confidence: <span className="font-semibold">{result.confidence}%</span>
            </p>
            <p className="text-gray-700">
              Recommendation: <span className="font-medium">{result.recommendation}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
// 'use client'
// import React, { useState } from "react";
// import { Send, Bot, User, Loader2 } from "lucide-react";

// interface Message {
//   sender: "user" | "bot";
//   text: string;
// }

// export default function AIChatBotPage() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage: Message = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMessage]);

//     setLoading(true);

//     const res = await fetch("/api/chatbot", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ question: input }),
//     });

//     const data = await res.json();

//     const botMessage: Message = { sender: "bot", text: data.answer };
//     setMessages((prev) => [...prev, botMessage]);

//     setInput("");
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8 flex flex-col items-center">
      
//       <h1 className="text-4xl font-bold text-green-700 mb-6">
//         🌾 AI Farming Assistant
//       </h1>

//       <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 flex flex-col">
        
//         {/* Chat Window */}
//         <div className="h-[500px] overflow-y-auto mb-4 p-4 border rounded-xl bg-gray-50">
//           {messages.map((msg, i) => (
//             <div
//               key={i}
//               className={`flex items-start my-2 ${
//                 msg.sender === "user" ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`max-w-xs p-3 rounded-xl shadow ${
//                   msg.sender === "user"
//                     ? "bg-green-600 text-white rounded-br-none"
//                     : "bg-white text-gray-800 rounded-bl-none border"
//                 }`}
//               >
//                 {msg.sender === "bot" && (
//                   <Bot className="w-4 h-4 inline-block mr-2 text-green-700" />
//                 )}
//                 {msg.text}
//               </div>
//             </div>
//           ))}

//           {loading && (
//             <div className="flex items-center gap-2 text-green-700 mt-3">
//               <Loader2 className="animate-spin w-5 h-5" />
//               AI is thinking...
//             </div>
//           )}
//         </div>

//         {/* Send Message */}
//         <div className="flex items-center gap-3">
//           <input
//             className="flex-1 p-3 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-green-500"
//             placeholder="Ask anything about crops, diseases, fertilizers..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//           />

//           <button
//             onClick={sendMessage}
//             className="bg-green-600 text-white p-3 rounded-xl flex items-center gap-2 hover:bg-green-700 transition"
//           >
//             <Send className="w-5 h-5" />
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }