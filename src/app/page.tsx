// src/app/page.tsx
'use client';

import PainTrackerApp from '@/components/paintrackerapp';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div className="fixed top-4 right-4 space-x-4 z-50">
        <Link
          href="/login"
          className="px-6 py-2 bg-white text-purple-600 border-2 border-purple-600 rounded-lg hover:bg-purple-50 transition-all duration-200"
        >
          로그인
        </Link>
        <Link
          href="/signup"
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200"
        >
          회원가입
        </Link>
      </div>
      <PainTrackerApp />
    </main>
  );
}
