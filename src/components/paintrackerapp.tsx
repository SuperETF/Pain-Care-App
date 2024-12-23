'use client'

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';

interface PainRecord {
 bodyPart: string;
 painType: string;
 painScore: number;
 timestamp: number;
 afterScore?: number;
}

interface PainTypes {
 [key: string]: {
   [key: string]: string;
 };
}

const PainTrackerApp: React.FC = () => {
 const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);
 const [selectedPainType, setSelectedPainType] = useState<string | null>(null);
 const [painHistory, setPainHistory] = useState<PainRecord[]>([]);
 const [showPainInput, setShowPainInput] = useState(false);
 const [showVideo, setShowVideo] = useState(false);
 const [currentVideo, setCurrentVideo] = useState<string | null>(null);
 const [showAfterPainInput, setShowAfterPainInput] = useState(false);
 const [showPainType, setShowPainType] = useState(false);

 const bodyParts: { [key: string]: string } = {
   back: '허리',
   neck: '목',
   shoulder: '어깨',
   knee: '무릎',
   ankle: '발목',
   wrist: '손목'
 };

 const painVideos: PainTypes = {
   back: {
     acute: "1041728600",
     chronic: "1041728600",
     disc: "1041728600"
   }
 };

 const handleBodyPartClick = (part: string): void => {
   setSelectedBodyPart(part);
   setShowPainType(true);
 };

 const handleVideoComplete = (): void => {
   setShowVideo(false);
   setShowAfterPainInput(true);
 };

 const handlePainScoreSubmit = (score: number): void => {
   if (!selectedBodyPart || !selectedPainType) return;

   const newRecord: PainRecord = {
     bodyPart: selectedBodyPart,
     painType: selectedPainType,
     painScore: score,
     timestamp: Date.now()
   };

   const updatedHistory = [...painHistory, newRecord];
   setPainHistory(updatedHistory);
   localStorage.setItem('painHistory', JSON.stringify(updatedHistory));
   
   setShowPainInput(false);
   if (painVideos[selectedBodyPart]?.[selectedPainType]) {
     setCurrentVideo(painVideos[selectedBodyPart][selectedPainType]);
     setShowVideo(true);
   }
 };

 const handleAfterPainScore = (score: number): void => {
   const updatedHistory = [...painHistory];
   const lastRecord = updatedHistory[updatedHistory.length - 1];
   lastRecord.afterScore = score;
   
   localStorage.setItem('painHistory', JSON.stringify(updatedHistory));
   setPainHistory(updatedHistory);
   
   setShowAfterPainInput(false);
   setSelectedBodyPart(null);
   setSelectedPainType(null);
 };

 return (
   <div className="min-h-screen bg-gray-50 p-4">
     <div className="max-w-4xl mx-auto">
       <h1 className="text-3xl font-bold text-center mb-8">통증 케어 도우미</h1>
       
       {showVideo ? (
  <div className="space-y-4">
    <div className="aspect-video bg-black rounded-lg overflow-hidden">
      <iframe
        src={`https://player.vimeo.com/video/${currentVideo}?autoplay=1&title=0&byline=0&portrait=0`}
        className="w-full h-full"
        allow="autoplay; fullscreen"
        allowFullScreen
        frameBorder="0"
      />
    </div>
    <button onClick={handleVideoComplete} className="block mx-auto px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      운동 완료
    </button>
  </div>
) : showAfterPainInput ? (
         <div className="space-y-6">
           <h2 className="text-2xl font-semibold text-center">
             마사지 후 통증 점수를 입력해주세요
           </h2>
           <div className="flex flex-wrap justify-center gap-4">
             {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
               <button
                 key={score}
                 onClick={() => handleAfterPainScore(score)}
                 className={`w-12 h-12 rounded-full flex items-center justify-center
                   ${score <= 3 ? 'bg-green-500' : 
                     score <= 6 ? 'bg-yellow-500' : 
                     'bg-red-500'} 
                   text-white font-bold hover:opacity-80 transition-opacity`}
               >
                 {score}
               </button>
             ))}
           </div>
         </div>
       ) : showPainType ? (
         <div className="space-y-6">
           <h2 className="text-2xl font-semibold text-center">
             {bodyParts[selectedBodyPart!]} 통증의 유형을 선택해주세요
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {painVideos[selectedBodyPart!] && Object.entries(painVideos[selectedBodyPart!]).map(([type]) => (
               <Card 
                 key={type}
                 className="p-6 cursor-pointer hover:bg-gray-100 transition-colors"
                 onClick={() => {
                   setSelectedPainType(type);
                   setShowPainType(false);
                   setShowPainInput(true);
                 }}
               >
                 <div className="text-center">
                   <div className="text-xl font-medium mb-2">
                     {type === 'acute' ? '급성 통증' :
                      type === 'chronic' ? '만성 통증' :
                      type === 'disc' ? '디스크성 통증' : type}
                   </div>
                 </div>
               </Card>
             ))}
           </div>
           <button
             onClick={() => {
               setShowPainType(false);
               setSelectedBodyPart(null);
             }}
             className="block mx-auto mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
           >
             다시 선택하기
           </button>
         </div>
       ) : showPainInput ? (
         <div className="space-y-6">
           <h2 className="text-2xl font-semibold text-center">
             통증 점수를 선택해주세요
           </h2>
           <div className="flex flex-wrap justify-center gap-4">
             {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
               <button
                 key={score}
                 onClick={() => handlePainScoreSubmit(score)}
                 className={`w-12 h-12 rounded-full flex items-center justify-center
                   ${score <= 3 ? 'bg-green-500' : 
                     score <= 6 ? 'bg-yellow-500' : 
                     'bg-red-500'} 
                   text-white font-bold hover:opacity-80 transition-opacity`}
               >
                 {score}
               </button>
             ))}
           </div>
           <button
             onClick={() => {
               setShowPainInput(false);
               setShowPainType(true);
             }}
             className="block mx-auto mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
           >
             다시 선택하기
           </button>
         </div>
       ) : (
         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
           {Object.entries(bodyParts).map(([key, value]) => (
             <Card 
               key={key}
               className="p-6 cursor-pointer hover:bg-gray-100 transition-colors"
               onClick={() => handleBodyPartClick(key)}
             >
               <div className="text-center">
                 <div className="text-xl font-medium mb-2">{value}</div>
               </div>
             </Card>
           ))}
         </div>
       )}
     </div>
   </div>
 );
};

export default PainTrackerApp;