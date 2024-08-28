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

  type resType = {
    data: {
      choices: Array<{
        message: {
          content: "";
        };
      }>;
    };
  };

  const checkValidQuestion = (): boolean => {
    if (question.trim().length == 0) {
      const failed: MessageProps = {
        sender: "bot",
        body: "1글자 이상의 질문을 입력해주세요.",
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
      const res: resType = await axios.post(
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
      if (
        !res ||
        !res.data ||
        !res.data.choices ||
        Array.isArray(res.data.choices) == false ||
        res.data.choices.length == 0 ||
        !res.data.choices[0].message ||
        !res.data.choices[0].message.content
      ) {
        throw new Error("응답을 받지 못했습니다. 다시 시도해 주세요.");
      }
      const ans: MessageProps = {
        sender: "bot",
        body: res.data.choices[0].message.content,
      };
      setMessage((message) => [...message, ans]);
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status
      ) {
        if (error.response.status >= 400 && error.response.status < 500) {
          const err: MessageProps = {
            sender: "bot",
            body: "잘못된 요청입니다. 잠시 후 시도해 주세요.",
          };
          setMessage((message) => [...message, err]);
        } else if (error.response.status >= 500) {
          const err: MessageProps = {
            sender: "bot",
            body: "서버에 문제가 생겼습니다. 잠시 후 다시 시도해 주세요.",
          };
          setMessage((message) => [...message, err]);
        } else {
          const err: MessageProps = {
            sender: "bot",
            body: "알 수 없는 에러가 발생했습니다." + error.message,
          };
          setMessage((message) => [...message, err]);
        }
      }
    }
  };

  const sendQuestion = () => {
    if (checkValidQuestion()) {
      requestApi();
    } else return;
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
