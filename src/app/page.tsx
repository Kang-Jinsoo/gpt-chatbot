"use client";
import "./globals.css";
import Question from "@/components/ui/question";
import Answer from "@/components/ui/answer";
import { useState } from "react";
import axios from "axios";
import Message from "@/components/ui/message";
import Chatting from "./chattingMock";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string[]>([]);
  const [message, setMessage] = useState<string[]>([]);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;
  const endpoint = process.env.NEXT_PUBLIC_ANDPOINT as string;

  const inputQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const questionSend = async () => {
    if (question) {
      setAnswer([...message, question]);
      setQuestion("");
    }
    try {
      const res = await axios.post(
        endpoint,
        {
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: question }],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );
      setAnswer(res.data.choices[0].message.content);
    } catch (error: any) {
      setAnswer(error.message);
    }
  };
  return (
    <div className="h-full border-white">
      <header className="h-1/6 mx-custom flex items-center">
        <p className="text-3xl font-mono">chatBot</p>
      </header>
      <main className="h-4/6 mx-custom overflow-y-auto">
        {Chatting.map((Chatting, i) => (
          <Message user={Chatting.user} bot={Chatting.bot} key={i} />
        ))}
      </main>
      <footer className="h-1/6 mx-custom flex justify-center items-center">
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
      </footer>
    </div>
  );
}
