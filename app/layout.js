import './globals.css'
import { Inter } from 'next/font/google'
import { ReactQueryProvider } from './ReactQueryProvider';

const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Slack App',
  description: 'Created by Arjay and Radha',
}

export default function RootLayout({ children }) {
  return (
  
    <html lang="en">
    <ReactQueryProvider>
      <body className={inter.className}>{children}</body>
    </ReactQueryProvider>
    </html>
      )
}
