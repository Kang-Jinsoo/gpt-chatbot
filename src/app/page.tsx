import "./globals.css";
import Question from "@/components/ui/question";
import Answer from "@/components/ui/answer";

export default function Home() {
  return (
    <div className="h-full border-white">
      <div className="h-1/6 text-3xl font-mono mx-custom flex items-center">
        chatBot
      </div>
      <div className="h-4/6 overflow-y-auto mx-custom">
        <Question />
        <Answer />
      </div>
      <div className="h-1/6 mx-custom flex justify-center items-center">
        <input
          type="text"
          placeholder="질문을 주세요."
          className="h-1/3 w-4/5 pl-5 p-3 bg-gray-900  text-white rounded-3xl"
        />
        <button className="h-1/3 ml-5 p-3 bg-gray-900 text-white rounded-3xl">
          전송
        </button>
      </div>
    </div>
  );
}
