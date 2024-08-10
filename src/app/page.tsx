import "./globals.css";

export default function Home() {
  return (
    <div className="h-full w-2/3 mx-10 border-white">
      <div className="h-1/6 p-5 text-3xl">chatbot</div>
      <div className="h-4/6 p-5 overflow-y-auto">
        <div className="p-3 text-sm text-gray-200">gd</div>
        <div className="p-3 text-sm text-gray-200">gd</div>
        <div className="p-3 text-sm text-gray-200">gd</div>
        <div className="p-3 text-sm text-gray-200">gd</div>
        <div className="p-3 text-sm text-gray-200">gd</div>
        <div className="p-3 text-sm text-gray-200">gd</div>
        <div className="p-3 text-sm text-gray-200">gd</div>
        <div className="p-3 text-sm text-gray-200">gd</div>
        <div className="p-3 text-sm text-gray-200">gd</div>
        <div className="p-3 text-sm text-gray-200">gd</div>
        <div className="p-3 text-sm text-gray-200">gd</div>
        <div className="p-3 text-sm text-gray-200">gd</div>
        <div className="p-3 text-sm text-gray-200">gd</div>
        <div className="p-3 text-sm text-gray-200">gd</div>
        <div className="p-3 text-sm text-gray-200">gd</div>
      </div>
      <div className="mt-5 h-1/6">
        <input
          type="text"
          placeholder="질문을 해보세요."
          className="p-2 text-black rounded-xl"
        />
        <button className="ml-5 bg-white text-black"> 전송 </button>
      </div>
    </div>
  );
}
