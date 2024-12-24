import React from "react";

interface PainInputProps {
  onSubmit: (score: number) => void;
  onBack: () => void;
}

const PainInput: React.FC<PainInputProps> = ({ onSubmit, onBack }) => {
  return (
    <div className="space-y-6 text-center">
      {/* 제목 */}
      <h2 className="text-3xl font-bold text-gray-800">
        통증 점수를 선택해주세요
      </h2>
      <div className="w-16 mx-auto h-1 bg-gray-400 rounded-full"></div>

      {/* 통증 점수 버튼 */}
      <div className="flex justify-center gap-4 mt-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
          <button
            key={score}
            onClick={() => onSubmit(score)}
            className={`w-10 h-10 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 ${
              score <= 3
                ? "bg-green-500 text-white hover:bg-green-600"
                : score <= 6
                ? "bg-yellow-500 text-white hover:bg-yellow-600"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            {score}
          </button>
        ))}
      </div>

      {/* 뒤로가기 버튼 */}
      <button
        onClick={onBack}
        className="mt-6 px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg shadow hover:bg-gray-300 transition duration-300"
      >
        다시 선택하기
      </button>
    </div>
  );
};

export default PainInput;
