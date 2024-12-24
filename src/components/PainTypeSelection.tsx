import React from "react";

interface PainTypeSelectionProps {
  bodyPart: string;
  painTypes: { [key: string]: string };
  onSelect: (painType: string) => void;
  onBack: () => void;
}

const PainTypeSelection: React.FC<PainTypeSelectionProps> = ({
  bodyPart,
  painTypes,
  onSelect,
  onBack,
}) => (
    <div className="space-y-6">
    {/* 제목 부분 */}
    <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text tracking-wide">
      {bodyPart} 통증 유형을 선택해주세요
    </h2>
    <div className="w-20 mx-auto mt-2 h-1 bg-purple-500 rounded-full"></div>
  
    {/* 버튼 목록 */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Object.entries(painTypes).map(([key, value]) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 border border-gray-200 transition-all duration-300"
        >
          <span className="text-xl font-semibold text-gray-800">{value}</span>
        </button>
      ))}
    </div>
  
    {/* 뒤로가기 버튼 */}
    <button
      onClick={onBack}
      className="block mx-auto mt-6 px-6 py-3 bg-gray-200 rounded-lg shadow hover:bg-gray-300 transition duration-300"
    >
      다시 선택하기
    </button>
  </div>
  
);

export default PainTypeSelection;
