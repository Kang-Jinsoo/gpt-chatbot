"use client";
import "./globals.css";
import { useState } from "react";
import axios from "axios";
import { Message, MessageProps } from "@/components/ui/message";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState<MessageProps[]>([]);
  const endPoint = process.env.NEXT_PUBLIC_ANDPOINT as string;
  const apikey = process.env.NEXT_PUBLIC_API_KEY as string;

  const inputQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const validateQuestion = (): boolean => {
    if (question.trim().length == 0) {
      const failed: MessageProps = {
        sender: "bot",
        body: "질문을 입력해주세요.",
      };
      setMessage((message) => [...message, failed]);
      return false;
    } else {
      const que: MessageProps = { sender: "user", body: question };
      setMessage((message) => [...message, que]);
      setQuestion("");
      return true;
    }
  };

  const requestApi = async () => {
    try {
      const res = await axios.post(
        endPoint,
        {
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: question }],
        },
        {
          headers: {
            Authorization: `Bearer ${apikey}`,
            "Content-Type": "application/json",
          },
        }
      );
      const ans: MessageProps = {
        sender: "bot",
        body: res.data.choices[0].message.content,
      };
      setMessage((message) => [...message, ans]);
    } catch (error: any) {
      console.log("err = ", error);
      const err: MessageProps = {
        sender: "bot",
        body: error.message,
      };
      setMessage((message) => [...message, err]);
    }
  };

  const sendQuestion = () => {
    if (validateQuestion() == false) {
      return;
    } else requestApi();
  };

  return (
    <div className="h-full border-white">
      <header className="h-1/6 mx-custom flex items-center">
        <p className="text-3xl font-mono">chatBot</p>
      </header>
      <main className="h-4/6 mx-custom overflow-y-auto">
        {message.map((chat, i) => (
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
