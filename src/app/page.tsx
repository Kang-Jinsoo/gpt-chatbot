"use client";
import "./globals.css";
import Question from "@/components/ui/question";
import Answer from "@/components/ui/answer";
import { useState } from "react";
import OpenAI from "openai";
import axios from "axios";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState<string[]>([]);
  const [answer, setAnswer] = useState("");
  const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;
  const organization = process.env.NEXT_PUBLIC_ORGANIZATION as string;
  const endpoint = process.env.NEXT_PUBLIC_ANDPOINT as string;

  const inputQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const questionSend = async () => {
    if (question) {
      setMessage([...message, question]);
      setQuestion("");
    }
    try {
      const res = await axios.post(
        endpoint,
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: question,
            },
          ],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", res.data); // 응답 데이터 확인
      setAnswer(res.data.choices[0].message.content);
      console.log(answer);
    } catch (error: any) {
      console.error("error = ", error);
      setAnswer(error.message);
    }
  };
  return (
    <div className="h-full border-white">
      <div className="h-1/6 mx-custom flex items-center">
        <p className="text-3xl font-mono">chatBot</p>
      </div>
      <div className="h-4/6 mx-custom overflow-y-auto">
        {message.map((message, i) => (
          <Question text={message} key={i} />
        ))}
        <Answer answer={answer} />
      </div>
      <div className="h-1/6 mx-custom flex justify-center items-center">
        <input
          type="text"
          placeholder="질문을 주세요."
          className="h-1/3 w-4/5 pl-5 p-3 bg-gray-800  text-white rounded-3xl"
          value={question}
          onChange={inputQuestion}
        />
        <button
          className="h-1/3 ml-5 p-3 bg-gray-800 text-white rounded-3xl"
          onClick={questionSend}
        >
          전송
        </button>
      </div>
    </div>
  );
}
