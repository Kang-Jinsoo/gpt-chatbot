export type MessageProps = {
  sender: "user" | "bot";
  body: string;
};

export function Message({ sender, body }: MessageProps) {
  return (
    <div>
      {sender == "user" ? (
        <div className="flex justify-end mb-3">
          <div className="px-4 py-3 text-md text-white rounded-3xl mr-5 bg-gray-800">
            {body}
          </div>
        </div>
      ) : (
        <div className="flex justify-start mb-5">
          <div className="px-4 py-3 text-md text-white rounded-3xl ml-3">
            {body}
          </div>
        </div>
      )}
    </div>
  );
}
