import React from "react";

interface AskForSymptomsProps {
  onYes: () => void;
  onNo: () => void;
}

const AskForSymptoms: React.FC<AskForSymptomsProps> = ({ onYes, onNo }) => (
  <div className="space-y-6 text-center">
    <h2 className="text-3xl font-bold text-gray-800">
      증상이 남아있습니까?
    </h2>
    <div className="w-16 mx-auto h-1 bg-gray-400 rounded-full"></div>
    <div className="flex justify-center gap-6 mt-6">
      <button
        onClick={onYes}
        className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-300"
      >
        예
      </button>
      <button
        onClick={onNo}
        className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition duration-300"
      >
        아니요
      </button>
    </div>
  </div>
);

export default AskForSymptoms;
