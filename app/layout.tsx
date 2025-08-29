import type { Metadata } from 'next'
import '../src/index.css'

export const metadata: Metadata = {
  title: 'YouTube Videoke App',
  description: 'Sing your heart out with thousands of karaoke tracks!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}