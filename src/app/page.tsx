"use client";
import "./globals.css";
import Question from "@/components/ui/question";
import Answer from "@/components/ui/answer";
import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState<string[]>([]);

  const inputQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const questionSend = () => {
    if (question) {
      setMessage([...message, question]);
      setQuestion("");
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

// onclick을 하면 인풋창에 answer컴포넌트와 함께 입력된 값을 띄운다
