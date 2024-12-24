'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Router import
import supabase from '@/lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('로그인 오류:', error.message);
        setErrorMessage('로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.');
      } else if (data.session) {
        console.log('로그인 성공:', data.session);
        localStorage.setItem('currentUser', email);
        
        // 로그인 성공 후 첫 화면으로 리디렉션
        router.push('/');
      }
    } catch (err) {
      console.error('로그인 처리 중 오류:', err);
      setErrorMessage('로그인 처리 중 문제가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">로그인</h2>
          <p className="mt-2 text-gray-600">계정에 로그인하세요</p>
        </div>

        {errorMessage && (
          <div className="mb-4 text-center text-red-600">
            <p>{errorMessage}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="이메일을 입력하세요"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              로그인
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link href="/signup" className="text-sm text-purple-600 hover:text-purple-500">
            아직 계정이 없으신가요? 회원가입하기
          </Link>
        </div>
      </div>

      <div className="mt-4 text-center">
        <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
          메인으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
