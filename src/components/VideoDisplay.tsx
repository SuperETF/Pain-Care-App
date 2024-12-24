import React from "react";

interface VideoDisplayProps {
  videoId: string;
  description?: string; // description을 선택적으로 받도록 변경
  onComplete: () => void;
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({ videoId, description = "비디오 설명이 없습니다.", onComplete }) => (
  <div className="space-y-4">
    <div className="text-center mb-4">
      <h2 className="text-xl font-semibold">{description}</h2> {/* 비디오 설명 표시 */}
    </div>
    <div className="aspect-video bg-black rounded-lg overflow-hidden">
      <iframe
        src={`https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`}
        className="w-full h-full"
        allow="autoplay; fullscreen"
        allowFullScreen
        frameBorder="0"
      />
    </div>
    <button
      onClick={onComplete}
      className="block mx-auto px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      운동 완료
    </button>
  </div>
);

export default VideoDisplay;
