import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Doctor Listing',
  description: 'Find and book appointments with doctors',
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