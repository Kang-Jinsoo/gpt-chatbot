export type questionContents = {
  text: string[];
};

export default function Question({ text }: questionContents) {
  return (
    <div className="flex justify-end mb-3">
      <div className="flex justify-end px-4 py-3 text-md rounded-3xl bg-gray-800 content-center">
        {text}
      </div>
    </div>
  );
}
