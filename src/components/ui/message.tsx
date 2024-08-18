export type messageType = {
  user: string;
  bot: string;
};

export default function Message({ user, bot }: messageType) {
  return (
    <div>
      <div className="flex justify-end mb-3">
        <div className="px-4 py-3 text-md text-white rounded-3xl mr-5 bg-gray-800">
          {user}
        </div>
      </div>
      <div className="flex justify-start mb-5">
        <div className="px-4 py-3 text-md text-white rounded-3xl ml-5">
          {bot}
        </div>
      </div>
    </div>
  );
}
