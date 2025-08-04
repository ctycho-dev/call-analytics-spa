import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "AI-ассистент маркетолога | Инсайты из данных звонков за часы",
  description:
    "Быстро анализируйте накопленные звонки и переписки с помощью LLM. Получайте частотность, графики, выводы и Action Plan без новых интервью.",
  keywords: "AI маркетинг, анализ звонков, маркетинговые исследования, LLM, искусственный интеллект",
  authors: [{ name: "K. Korsun", email: "k.korsun@dssl.ru" }],
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
