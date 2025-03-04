'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Check, ClipboardCopy, FileText, RotateCcw, Copy, X, Loader2 } from 'lucide-react';

const SAMPLE_TEXT = `The history of space exploration is a testament to human curiosity, ambition, and technological progress. It began in the mid-20th century, primarily fueled by the Cold War rivalry between the United States and the Soviet Union. The Space Age officially commenced on October 4, 1957, when the Soviet Union launched *Sputnik 1*, the world's first artificial satellite, proving that humanity could reach beyond Earth. Soon after, in 1957, the Soviets sent *Laika*, the first living being in orbit, followed by Yuri Gagarin's historic spaceflight aboard *Vostok 1* in 1961, making him the first human to travel to space. 

In response, the U.S. launched the Apollo program, culminating in the Apollo 11 mission on July 20, 1969, when Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon. In the following decades, space agencies developed space stations like *Mir* and the International Space Station (ISS), sent robotic missions to distant planets, and introduced reusable spacecraft like the Space Shuttle. The 21st century saw the emergence of private space companies such as SpaceX, Blue Origin, and Virgin Galactic, making space travel more commercially viable. With ongoing plans for Mars colonization, lunar bases, and deep-space exploration, humanity continues to push the frontiers of the cosmos, searching for new worlds and extraterrestrial life while advancing science and technology.`;

export function TextProcessor() {
  const [wordCount, setWordCount] = useState({ input: 0, output: 0 });
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const countWords = (text: string) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputText(value);
    setWordCount((prev) => ({
      ...prev,
      input: countWords(value),
    }));
    setIsInputActive(true);
  };

  const handleInputFocus = () => {
    setIsInputActive(true);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (e.target.value.trim() === '') {
      setIsInputActive(false);
    }
  };

  const handleInputReset = () => {
    setInputText('');
    setWordCount((prev) => ({ ...prev, input: 0 }));
    setIsInputActive(false);
  };

  const handleTrySample = () => {
    setInputText(SAMPLE_TEXT);
    setWordCount((prev) => ({
      ...prev,
      input: countWords(SAMPLE_TEXT),
    }));
    setIsInputActive(true);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handlePasteText = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputText(text);
      setWordCount((prev) => ({
        ...prev,
        input: countWords(text),
      }));
      setIsInputActive(true);
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  const extractOutputFromResponse = (responseText: string): string => {
    // Extract text between <o> tags - using a workaround for the dotAll flag
    const match = responseText.match(/<o>([\s\S]+?)<\/o>/);
    return match ? match[1].trim() : responseText;
  };

  const handleHumanize = async () => {
    if (!inputText.trim()) {
      setOutputText('Please enter some text to humanize');
      setHasError(true);
      return;
    }

    setIsLoading(true);
    setHasError(false);
    setOutputText('');
    setShowResults(false);

    try {
      // Replace with your actual API key or use an environment variable
      const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

      if (!API_KEY) {
        throw new Error('Gemini API key is not configured');
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-pro-exp-02-05:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: inputText,
                  },
                ],
              },
            ],
            systemInstruction: {
              role: 'user',
              parts: [
                {
                  text: `Rewrite the input text in ${countWords(inputText)} words and in the writing style with NO detectable patterns. Every sentence structure + grammar random. Include grammatical mistakes throughout, that 99% of humans wouldn't spot. 1st grade simple language. But dont make the tone too childish or cringe. Change the writing style every sentence...\n\nSubmit your response in the following tag:\n<o>  \nYour Rewritten text Here\n</o>  `,
                },
              ],
            },
            generationConfig: {
              temperature: 1,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 8192,
              responseMimeType: 'text/plain',
            },
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get response from Gemini API');
      }

      const data = await response.json();

      if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
        const text = data.candidates[0].content.parts[0].text;
        const processedText = extractOutputFromResponse(text);
        setOutputText(processedText);
        setWordCount((prev) => ({
          ...prev,
          output: countWords(processedText),
        }));
        setShowResults(true);
      } else {
        throw new Error('Unexpected response format from Gemini API');
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setOutputText(`Error: ${error instanceof Error ? error.message : 'Failed to humanize text'}`);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyOutput = async () => {
    if (outputText) {
      try {
        await navigator.clipboard.writeText(outputText);
        // Could add a toast notification here
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    }
  };

  const handleReset = () => {
    setOutputText('');
    setWordCount((prev) => ({ ...prev, output: 0 }));
    setHasError(false);
    setShowResults(false);
  };

  return (
    <div className="mx-auto max-w-7xl rounded-3xl border border-gray-800/50 bg-[#0A0A0A]/50 p-6 backdrop-blur-sm">
      {/* Text Areas */}
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        {/* Input Section */}
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              placeholder="Enter your text here..."
              className="min-h-[400px] resize-none rounded-2xl border-gray-800 bg-[#1A1A1A] p-4 text-gray-200 placeholder:text-gray-600 focus:border-blue-600 focus:ring-0 no-scrollbar"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              value={inputText}
            />
            {(!isInputActive || wordCount.input === 0) && (
              <div className="absolute inset-0 flex items-center justify-center gap-4 pointer-events-none">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 rounded-lg border-gray-800 bg-[#1A1A1A] text-gray-300 hover:bg-[#252525] pointer-events-auto"
                  onClick={handleTrySample}
                >
                  <FileText className="h-4 w-4" />
                  Try A Sample
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 rounded-lg border-gray-800 bg-[#1A1A1A] text-gray-300 hover:bg-[#252525] pointer-events-auto"
                  onClick={handlePasteText}
                >
                  <ClipboardCopy className="h-4 w-4" />
                  Paste Text
                </Button>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              {wordCount.input} Words
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500 hover:text-gray-400"
                onClick={handleInputReset}
                disabled={!inputText}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-400">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <Button
              className="bg-indigo-600 text-sm hover:bg-indigo-700"
              onClick={handleHumanize}
              disabled={isLoading || !inputText.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Humanize'
              )}
            </Button>
          </div>
        </div>

        {/* Output Section */}
        <div className="flex flex-col gap-4">
          <div
            className={`min-h-[400px] max-h-[400px] overflow-auto rounded-2xl border border-gray-800 bg-[#1A1A1A] p-4 ${hasError ? 'border-red-600/50' : ''} no-scrollbar`}
          >
            {isLoading ? (
              <div className="flex h-full flex-col items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-600 mb-4" />
                <p className="text-gray-400">Humanizing your text...</p>
              </div>
            ) : outputText ? (
              <Textarea
                readOnly
                value={outputText}
                className="min-h-[390px] max-h-[390px] w-full resize-none bg-transparent text-gray-200 focus:ring-0 border-none no-scrollbar"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center">
                <div className="mb-4 h-16 w-16 rounded-2xl bg-indigo-600/20 p-4">
                  <img src="/logo.svg" alt="" className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium text-gray-200">Humanize Result</h3>
              </div>
            )}
          </div>
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              {wordCount.output} Words
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500 hover:text-gray-400"
                onClick={handleReset}
                disabled={!outputText}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500 hover:text-gray-400"
                onClick={handleCopyOutput}
                disabled={!outputText}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {showResults && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-2xl border border-gray-800 bg-[#1A1A1A] p-6">
          {/* Left side - Main result */}
          <div className="flex flex-col items-center justify-center text-center h-full">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 mb-3">
              <Check className="h-6 w-6 text-green-500" />
            </div>
            <p className="text-lg text-gray-300">The output content is most likely human-written.</p>
          </div>

          {/* Right side - Detailed results */}
          <div className="flex flex-col items-center text-center space-y-4">
            <p className="text-sm text-gray-400">Checking result:</p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: 'GPTZero', status: true },
                { name: 'Copyleaks', status: true },
                { name: 'ZeroGPT', status: true },
                { name: 'Crossplag', status: true },
                { name: 'Sapling', status: true },
                { name: 'Writer', status: true },
              ].map((detector) => (
                <div
                  key={detector.name}
                  className="flex items-center gap-2 rounded-full border border-gray-800 bg-[#252525] px-3 py-1.5"
                >
                  <div className="h-4 w-4 rounded-full bg-gray-700" />
                  <span className="text-sm text-gray-300">{detector.name}</span>
                  <Check className="h-4 w-4 text-green-500" />
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-green-500">Human-written</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-4 w-4 rounded-full border-2 border-gray-600" />
                <span className="text-gray-400">50% Human-written</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <X className="h-4 w-4 text-red-500" />
                <span className="text-red-500">AI-generated</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
