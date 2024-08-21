"use client";
import "./globals.css";
import { useState } from "react";
import axios from "axios";
import { Message, MessageProps } from "@/components/ui/message";
import Mock from "@/components/mock/ChattingMock";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState<MessageProps[]>([]);
  const endPoint = process.env.NEXT_PUBLIC_ANDPOINT as string;

  const inputQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const sendQuestion = async () => {
    if (question) {
      const que: MessageProps = { sender: "user", body: question };
      Mock.push(que);
      setMessage([...message, que]);
      setQuestion("");
    }
    try {
      const res = await axios.post(
        endPoint,
        {
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: question }],
        },
        {
          headers: {
            Authorization: "/apikey",
            "Content-Type": "application/json",
          },
        }
      );
      const ans: MessageProps = {
        sender: "bot",
        body: res.data.choices[0].message.content,
      };
      Mock.push(ans);
      setMessage([...message, ans]);
    } catch (error: any) {
      const err: MessageProps = {
        sender: "bot",
        body: error.message,
      };
      Mock.push(err);
      console.log(err);
      setMessage([...message, err]);
    }
  };
  return (
    <div className="h-full border-white">
      <header className="h-1/6 mx-custom flex items-center">
        <p className="text-3xl font-mono">chatBot</p>
      </header>
      <main className="h-4/6 mx-custom overflow-y-auto">
        {Mock.map((chat, i) => (
          <Message sender={chat.sender} body={chat.body} key={i} />
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
          onClick={sendQuestion}
        >
          전송
        </button>
      </footer>
    </div>
  );
}
