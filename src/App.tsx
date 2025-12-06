import React from "react";

export default function App() {
  const [transcript, setTranscript] = React.useState("");
  const [fileName, setFileName] = React.useState("");
  const [fileSize, setFileSize] = React.useState(0);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generatedAudio, setGeneratedAudio] = React.useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFileName(file.name);
      setFileSize(file.size);
    }
  }

  function handleGenerate() {
    if (transcript.trim().length === 0 || fileName === "") return;
    setIsGenerating(true);
    setTimeout(function() {
      setIsGenerating(false);
      setGeneratedAudio(true);
    }, 2000);
  }

  const isFormValid = transcript.trim().length > 0 && fileName !== "";

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(to bottom right, #faf5ff, #ffffff, #eff6ff)" }}>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="mb-2">AI Voice Cloning</h1>
            <p style={{ color: "#4b5563" }}>Upload a voice clip and transcript to generate AI-powered voice clones</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-6">
              <div className="mb-3" style={{ color: "#374151" }}>
                <span>Voice Transcript</span>
              </div>
              <textarea
                value={transcript}
                onChange={function(e) { setTranscript(e.target.value); }}
                placeholder="Type the transcript of what's being said in your voice clip..."
                className="w-full px-4 py-3 border-2 rounded-xl resize-none"
                style={{ height: "128px", borderColor: "#e5e7eb" }}
              />
              <p className="mt-2" style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                {transcript.length} characters
              </p>
            </div>

            <div className="mb-8">
              <div className="mb-3" style={{ color: "#374151" }}>
                <span>Voice Clip</span>
              </div>
              
              <div className="relative">
                <input
                  type="file"
                  id="audio-upload"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="audio-upload"
                  className="flex items-center justify-center w-full border-2 border-dashed rounded-xl cursor-pointer"
                  style={{ height: "128px", borderColor: "#d1d5db" }}
                >
                  {fileName ? (
                    <div className="text-center">
                      <div className="mb-1" style={{ color: "#9333ea" }}>
                        <span>{fileName}</span>
                      </div>
                      <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        {(fileSize / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p style={{ color: "#4b5563" }}>Upload your voice clip</p>
                      <p style={{ fontSize: "0.875rem", color: "#9ca3af", marginTop: "0.25rem" }}>MP3, WAV, or other audio formats</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!isFormValid || isGenerating}
              className="w-full text-white py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg"
              style={{
                background: isFormValid && !isGenerating ? "linear-gradient(to right, #9333ea, #2563eb)" : "#d1d5db",
                cursor: isFormValid && !isGenerating ? "pointer" : "not-allowed"
              }}
            >
              {isGenerating ? (
                <span>Generating Voice...</span>
              ) : (
                <span>Generate Voice Clone</span>
              )}
            </button>

            {generatedAudio && !isGenerating && (
              <div className="mt-6 p-4 border-2 rounded-xl" style={{ backgroundColor: "#f0fdf4", borderColor: "#bbf7d0" }}>
                <div className="mb-3" style={{ color: "#15803d" }}>
                  <span>Voice Generated Successfully!</span>
                </div>
                <p style={{ fontSize: "0.875rem", color: "#4b5563" }}>
                  Your AI voice clone has been generated and is ready to use.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
