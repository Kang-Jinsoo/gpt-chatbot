export type qaType = {
  user: string;
  bot: string;
};

export default function QA({ user, bot }: qaType) {
  return (
    <div>
      <div className="flex justify-end mb-3">
        <div className="flex justify-end px-4 py-3 text-md rounded-3xl bg-gray-800 content-center">
          {user}
        </div>
      </div>
      <div className="flex justify-start mb-5">
        <div className="px-4 py-3 text-md text-white rounded-3xl">{bot}</div>
      </div>
    </div>
  );
}
