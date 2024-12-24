'use client';

import React, { useState, useEffect } from 'react';
import PainChart from "@/components/painchart";
import PainInput from "@/components/PainInput";
import PainTypeSelection from "@/components/PainTypeSelection";
import VideoDisplay from "@/components/VideoDisplay";
import AskForSymptoms from "@/components/AskForSymtoms";

interface PainRecord {
  userId: string;
  bodyPart: string;
  painType: string;
  painScore: number;
  timestamp: number;
  afterScore?: number;
}

interface PainVideo {
  type: string;
  id: string;
  description: string;
}

const PainTrackerApp: React.FC = () => {
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);
  const [selectedPainType, setSelectedPainType] = useState<string | null>(null);
  const [painHistory, setPainHistory] = useState<PainRecord[]>(
    JSON.parse(localStorage.getItem('painHistory') || '[]')
  );
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [showPainInput, setShowPainInput] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [recommendation, setRecommendation] = useState<PainRecord | null>(null);
  const [askForSymptoms, setAskForSymptoms] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  const [isGuest, setIsGuest] = useState(true); // 비회원 상태
  const [showTitle, setShowTitle] = useState(true); // 제목 표시 상태

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setIsLoggedIn(true);
      setIsGuest(false);

      const allRecords = JSON.parse(localStorage.getItem('painHistory') || '[]');
      const userRecords = allRecords.filter((record: PainRecord) => record.userId === currentUser);
      setPainHistory(userRecords);

      if (userRecords.length > 0) {
        const lastRecord = userRecords[userRecords.length - 1];
        setRecommendation(lastRecord);
      }
    }
  }, []);

  useEffect(() => {
    if (painHistory.length > 0) {
      const lastRecord = painHistory[painHistory.length - 1];
      setRecommendation(lastRecord);
    }
  }, [painHistory]);

  const bodyParts: { [key: string]: string } = {
    back: '허리',
    neck: '목',
    shoulder: '어깨',
    knee: '무릎',
    ankle: '발목',
    wrist: '손목',
  };

  const painVideos: PainVideo[] = [
    { type: "stiff", id: "1041728600", description: "뻐근한 통증" },
    { type: "sharp", id: "1041728601", description: "찌릿한 통증" },
    { type: "sore", id: "1041728602", description: "시큼한 통증" },
    { type: "achy", id: "1041728603", description: "쑤시는 통증" },
    { type: "burning", id: "1041728604", description: "화끈거리는 통증" },
    { type: "numb", id: "1041728605", description: "저린 통증" },
    { type: "cramping", id: "1041728606", description: "쥐나는 통증" },
  ];

  const handleBodyPartClick = (part: string): void => {
    setShowChart(false);
    setShowTitle(false); // 제목 숨기기
    setSelectedBodyPart(part);
  };

  const handleSelectPainType = (type: string) => {
    setSelectedPainType(type);
    setCurrentVideoIndex(0);
    setShowVideo(true);
  };

  const handleVideoComplete = (): void => {
    setAskForSymptoms(true); // 증상 질문 페이지로 이동
    setShowVideo(false);
    setShowPainInput(true);
  };

  const handlePainScoreSubmit = (score: number): void => {
    if (!selectedBodyPart || !selectedPainType) return;

    const newRecord: PainRecord = {
      userId: localStorage.getItem('currentUser') || '',
      bodyPart: selectedBodyPart,
      painType: selectedPainType,
      painScore: score,
      timestamp: Date.now(),
    };

    if (isLoggedIn) {
      const updatedHistory = [...painHistory, newRecord];
      setPainHistory(updatedHistory);
      localStorage.setItem('painHistory', JSON.stringify(updatedHistory));
    }

    setAskForSymptoms(true); // 증상 질문 페이지로 이동
    setShowPainInput(false);
    setShowChart(true);

    if (currentVideoIndex < painVideos.length - 1) {
      const continueExercise = confirm("증상이 아직 남아있습니까? 마저 해봅시다!");
      if (continueExercise) {
        setShowChart(false);
        setCurrentVideoIndex(currentVideoIndex + 1);
        setShowVideo(true);
      } else {
        alert("증상이 없다면 현재 기록을 저장해서 두고두고 진행해 보세요!");
        setSelectedBodyPart(null);
        setSelectedPainType(null);
        setCurrentVideoIndex(0);
      }
    } else {
      if (isGuest) {
        alert(
          "회원가입 하시겠습니까? 통증 점수가 기록되며 앞으로 통증을 관리할 수 있습니다."
        );
      } else {
        alert("증상이 없다면 현재 기록을 저장해서 두고두고 진행해 보세요!");
      }
      setSelectedBodyPart(null);
      setSelectedPainType(null);
      setCurrentVideoIndex(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 제목 디자인 */}
        {showTitle && (
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text tracking-wide">
              통증 케어 가이드
            </h1>
            <div className="w-20 mx-auto mt-2 h-1 bg-purple-500 rounded-full"></div>
          </div>
        )}

        {/* 추천 운동 섹션 (로그인 후에만) */}
        {isLoggedIn && recommendation && (
          <div className="mb-6 p-4 bg-gradient-to-r from-green-100 to-teal-100 text-gray-800 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">✨ 저번에 효과가 있던 운동 ✨</h2>
            <p className="text-lg">
              <strong>{recommendation.bodyPart}</strong>의 "<em>{recommendation.painType}</em>" 통증 완화를 위한 운동을 추천합니다.
            </p>
          </div>
        )}

        {/* 증상 질문 */}
        {askForSymptoms ? (
          <AskForSymptoms
            onYes={() => {
              setShowVideo(true);
              setAskForSymptoms(false);
            }}
            onNo={() => {
              setShowChart(true);
              setAskForSymptoms(false);
            }}
          />
        ) : showChart ? (
          <div>
            <PainChart />
            <div className="text-center mt-6">
              <button
                onClick={() => {
                  setSelectedBodyPart(null);
                  setSelectedPainType(null);
                  setShowChart(false);
                  setAskForSymptoms(false);
                  setShowTitle(true); // 처음으로 돌아가기 시 제목 보이게 설정
                }}
                className="px-6 py-3 bg-indigo-500 text-white font-bold rounded-lg shadow hover:bg-indigo-600 transition duration-300"
              >
                처음으로 돌아가기
              </button>
            </div>
          </div>
        ) : !selectedBodyPart ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {Object.entries(bodyParts).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleBodyPartClick(key)}
                className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 border border-gray-200 transition-all duration-300"
              >
                <span className="text-xl font-semibold text-gray-800">{value}</span>
              </button>
            ))}
          </div>
        ) : !selectedPainType ? (
          <PainTypeSelection
            bodyPart={selectedBodyPart}
            painTypes={painVideos.reduce((acc, video) => {
              acc[video.type] = video.description;
              return acc;
            }, {} as { [key: string]: string })}
            onSelect={handleSelectPainType}
            onBack={() => {
              setShowChart(false);
              setSelectedBodyPart(null);
              setShowTitle(true); // 뒤로 가기 시 제목 보이기
            }}
          />
        ) : showVideo && painVideos[currentVideoIndex] ? (
          <VideoDisplay
            videoId={painVideos[currentVideoIndex]?.id || "defaultVideoId"}
            description={painVideos[currentVideoIndex]?.description || "비디오 설명 없음"}
            onComplete={() => {
              setAskForSymptoms(true);
              setShowVideo(false);
            }}
          />
        ) : showPainInput ? (
          <PainInput
            onSubmit={(score) => {
              handlePainScoreSubmit(score);
              setAskForSymptoms(true);
            }}
            onBack={() => {
              setShowChart(false);
              setSelectedPainType(null);
            }}
          />
        ) : (
          <div className="text-center text-red-500">
            비디오를 로드할 수 없습니다. 현재 비디오 데이터가 유효하지 않습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default PainTrackerApp;
