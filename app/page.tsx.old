/* eslint-disable @next/next/no-img-element */
"use client";
import "katex/dist/katex.min.css";

import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";
import { parseAsString } from "nuqs";
import { Globe, Code, FileText, X, Upload, PencilRuler } from "lucide-react";
import { useLanguage } from "./providers";
import React, { useState } from "react";

// Simple Home component that matches the screenshot
export default function Home() {
  const [query, setQuery] = useQueryState("q", parseAsString);
  const { language } = useLanguage();
  const [showDropdown, setShowDropdown] = useState(false);

  // Function to handle query submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get("q") as string;
    if (q?.trim()) {
      setQuery(q);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-black text-white">
      <main className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center space-y-8">
        <h1 className="text-4xl font-bold text-center mt-24 mb-6">
          {language === "en" ? "What do you want to explore?" : "ماذا تريد أن تستكشف؟"}
        </h1>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="relative w-full">
            <input
              type="text"
              name="q"
              placeholder={language === "en" ? "Ask a question..." : "اطرح سؤالاً..."}
              defaultValue={query || ""}
              className="w-full p-4 pr-12 rounded-md border border-gray-700 bg-[#111] text-white"
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </form>

        {/* Search options row */}
        <div className="flex items-center justify-center space-x-4 mt-2">
          <button className="p-2 rounded-full">
            <Globe className="h-5 w-5 text-gray-400" />
          </button>
          <button className="p-2 rounded-full">
            <Upload className="h-5 w-5 text-gray-400" />
          </button>
          <button className="p-2 rounded-full">
            <X className="h-5 w-5 text-gray-400" />
          </button>
          <button className="p-2 rounded-full">
            <Code className="h-5 w-5 text-gray-400" />
          </button>
          <button className="p-2 rounded-full">
            <FileText className="h-5 w-5 text-gray-400" />
          </button>
          <button className="p-2 rounded-full">
            <PencilRuler className="h-5 w-5 text-gray-400" />
          </button>
          <Button
            size="sm"
            variant="outline"
            className="ml-2 bg-blue-600 text-white border-none rounded-md px-3 py-1"
          >
            Grok 2.0
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-transparent text-gray-400 border-gray-700 rounded-md px-3 py-1"
          >
            Extreme
          </Button>
        </div>

        {/* Academic dropdown */}
        {showDropdown && (
          <div className="absolute mt-16 bg-[#222] border border-gray-700 rounded-md shadow-lg p-3 w-72 z-10">
            <div className="text-white font-medium mb-1">Academic</div>
            <div className="text-gray-400 text-sm">
              Search academic papers powered by Era
            </div>
          </div>
        )}

        {/* Date element at bottom right */}
        <div className="absolute bottom-4 right-4 flex items-center text-gray-400 text-sm">
          <span className="mr-2">📅</span>
          <span>Sun, Mar 23</span>
        </div>
      </main>
    </div>
  );
}
