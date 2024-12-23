// src/app/layout.tsx
import './globals.css'  // 이 부분이 중요합니다
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '통증 케어 도우미',
  description: '당신의 통증 관리를 도와드립니다',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
