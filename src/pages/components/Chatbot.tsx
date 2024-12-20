import { useState } from "react";
import axios from "axios";
export default function Chatbot() {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  function delayResponse(index: number, word: string) {
    setTimeout(() => {
      setAnswer((prev) => (prev || "") + word);
    }, index * 100);
  }
  async function generateAnswer(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;
    setGeneratingAnswer(true);
    setQuestion("");
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        method: "post",
        data: {
          contents: [
            {
              parts: [
                {
                  text:
                    "Urja Setu is a transformative initiative aimed at bridging energy access gaps in underserved communities. It focuses on promoting renewable energy solutions, empowering rural regions with sustainable power sources, and fostering eco-friendly development. Urja Setu integrates technology, education, and collaboration to enhance energy equity, reduce carbon footprints, and drive socio-economic progress." +
                    question +
                    "\nAnswer in 50 words with context to Urja Setu.",
                },
              ],
            },
          ],
        },
      });
      const aiResponse = response["data"]["candidates"][0]["content"]["parts"][0]["text"];
      const responseArr = aiResponse.split("**");
      let formattedResponse = "";
      for (let i = 0; i < responseArr.length; i++) {
        if (i % 2 == 0) formattedResponse += responseArr[i];
        else formattedResponse += `<b>${responseArr[i]}</b>`;
      }
      formattedResponse = formattedResponse.split("*").join("<br/>");
      const formattedResponseArray = formattedResponse.split(" ");
      formattedResponseArray.forEach((word, index) => {
        delayResponse(index, word + " ");
      });
      setAnswer(aiResponse);
    } catch (error) {
      console.log(error);
      setAnswer("Urja AI exception. Could not process request, please try again later.");
    } finally {
      setGeneratingAnswer(false);
    }
  }

  return (
    <div className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32 border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 ">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-4xl font-semibold tracking-tight">
              Ask Urja AI
            </h2>
            <p className="mt-4 text-lg">
              Urja AI: Igniting insights, powering possibilities, and always
              here to help!
            </p>
            <form onSubmit={generateAnswer} className="mt-6 flex gap-x-4">
              <label htmlFor="ask-question" className="sr-only">
                Ask a question
              </label>
              <input
                id="ask-question"
                name="question"
                type="text"
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question"
                className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 border border-black"
              />
              <button
                type="submit"
                className={`flex-none rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  generatingAnswer
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#94C973] hover:bg-[#2F5233] hover:text-white"
                }`}
                disabled={generatingAnswer}
              >
                {generatingAnswer ? "Generating..." : "Get Answer"}
              </button>
            </form>
          </div>
          {answer && (
            <div className="flex items-center justify-center mt-6 lg:mt-0">
              <div
                className="border border-black rounded-md p-4 w-full max-w-md"
                dangerouslySetInnerHTML={{ __html: answer }}
              />
            </div>
          )}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#B1D8B7] to-[#94C973] opacity-30"
        />
      </div>
    </div>
  );
}
