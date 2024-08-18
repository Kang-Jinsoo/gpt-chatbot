export type AnswerContents = {
  answer: string[];
};

export default function Answer({ answer }: AnswerContents) {
  return (
    <div className="flex justify-start mb-5">
      <div className="px-4 py-3 text-md text-white rounded-3xl">{answer}</div>
    </div>
  );
}
