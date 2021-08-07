import { IconCopy, IconArrowBack } from "@tabler/icons";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { historyContext } from "../utils/HistoryProvider";

function HistoryCard({ shortUrl, longUrl }) {
  return (
    <div className="p-3 bg-white rounded-lg mt-2 hover:shadow-md cursor-pointer transition-shadow">
      <div className="flex justify-between">
        <div className="text-gray-700 text-md font-medium">{shortUrl}</div>
        <div>
          <IconCopy size={20} className="w-full text-gray-500" />
        </div>
      </div>
      <div className="line-clamp text-gray-500 text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">
        {longUrl}
      </div>
    </div>
  );
}

export default function HistoryPage() {
  const { history } = useContext(historyContext);
  return (
    <div className="history login w-full rounded-lg bg-indigo-50 p-8 shadow-md">
      {history.length > 0 ? (
        <>
          <p className="text-center text-xl">Click to copy</p>
          {history.map((entry) => (
            <HistoryCard
              shortUrl={Object.entries(entry)[0][0]}
              longUrl={Object.entries(entry)[0][1]}
            />
          ))}
        </>
      ) : (
        <>
          <div className="text-gray-500 text-center">
            there is nothing in history yet!
          </div>
          <Link
            to="/"
            className=" text-gray-400 flex items-center justify-center mt-1 hover:text-indigo-400"
          >
            Go to home
            <IconArrowBack size={20} />
          </Link>
        </>
      )}
    </div>
  );
}
