'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // useRouter import 위치 수정
import supabase from '@/lib/supabaseClient';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    // 입력값 유효성 검사
    if (!email || !password || !confirmPassword) {
      setErrorMessage('모든 필드를 입력해주세요.');
      return;
    }

    // 비밀번호 확인
    if (password !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      // Supabase 회원가입 처리
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('회원가입 오류:', error.message);
        setErrorMessage(error.message);
      } else if (data?.user) {
        console.log('회원가입 성공:', data.user);
        setSuccessMessage('회원가입 성공! 이메일을 확인해 인증을 완료해주세요.');

        // 일정 시간 후 리디렉션
        setTimeout(() => {
          router.push('/pain-type-selection');
        }, 3000);
      }
    } catch (err) {
      console.error('회원가입 처리 중 오류:', err);
      setErrorMessage('회원가입 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">회원가입</h2>
          <p className="mt-2 text-gray-600">더 나은 건강 관리를 시작하세요</p>
        </div>

        {/* 에러 메시지 표시 */}
        {errorMessage && (
          <div className="mb-4 text-center text-red-600">
            <p>{errorMessage}</p>
          </div>
        )}

        {/* 성공 메시지 표시 */}
        {successMessage && (
          <div className="mb-4 text-center text-green-600">
            <p>{successMessage}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSignUp}>
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
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              비밀번호 확인
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="비밀번호를 다시 입력하세요"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              회원가입
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link href="/login" className="text-sm text-purple-600 hover:text-purple-500">
            이미 계정이 있으신가요? 로그인하기
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
