import { Check, Clipboard, Sparkles } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

import { Input } from "../ui/input";

import ReactMarkdown from "react-markdown";

import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

const AiButton = () => {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const [copied, setCopied] = useState(false);

  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string;

  const handleGenerate = async () => {
    setIsGenerating(true);
    setOutput("Generating...");
    try {
      // Assemble the prompt content
      const contents = [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ];

      // Initialize the Google Generative AI client
      const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash", // or gemini-1.5-pro
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
        ],
      });

      // Call the multimodal model and get a stream of results
      const result = await model.generateContentStream({ contents });

      // Read from the stream and interpret the output as markdown
      let buffer = [];
      for await (let response of result.stream) {
        buffer.push(response.text());
        setOutput(buffer.join(""));
      }
    } catch (e) {
      setOutput(`Error: ${e}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          title={"Generate AI"}
          className={`cursor-pointer rounded-md p-2 text-slate-300 hover:bg-[#374151] active:text-white`}
        >
          <Sparkles size={24} />
        </button>
      </DialogTrigger>

      <DialogContent
        className="max-w-xs border-slate-600 bg-[#1D2633] sm:max-w-md lg:max-w-3xl"
        overlayColor="bg-[#121928]/60"
        top="top-[50%]"
      >
        <DialogHeader>
          <DialogTitle className="text-center text-white">
            Generate Content with AI
          </DialogTitle>

          <div className="flex flex-col gap-3 pt-5">
            <div className="flex w-full items-center space-x-2">
              <Input
                placeholder="Prompt AI"
                className="bg-transparent text-slate-200"
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isGenerating) handleGenerate();
                }}
              />

              <Button className="bg-slate-950" onClick={handleGenerate}>
                Generate
              </Button>
            </div>

            <div className="max-h-52 overflow-scroll lg:max-h-96">
              <ReactMarkdown className="text-white">
                {output || "Output"}
              </ReactMarkdown>
            </div>
          </div>
        </DialogHeader>

        <DialogFooter>
          <Button type="button" onClick={handleCopy} className="space-x-1">
            {copied ? (
              <>
                <Check size={24} />
                <span>Content Copied</span>
              </>
            ) : (
              <>
                <Clipboard size={24} />
                <span>Copy to Clipboard</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AiButton;
