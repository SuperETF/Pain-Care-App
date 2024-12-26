import React from "react";

interface BodyPartsProps {
  bodyParts: { [key: string]: string };
  onSelect: (bodyPart: string) => void;
}

const BodyParts: React.FC<BodyPartsProps> = ({ bodyParts, onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {Object.entries(bodyParts).map(([key, value]) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 border border-gray-200 transition-all duration-300"
        >
          <span className="text-xl font-semibold text-gray-800">{value}</span>
        </button>
      ))}
    </div>
  );
};

export default BodyParts;
