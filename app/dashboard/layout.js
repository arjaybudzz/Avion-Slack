import Navbar from '@/components/Nav'
import Sidebar from '@/components/SideBar'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Dashboard',
  description: 'Slack App Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <div className={inter.className}>
      <Navbar />
      <div className="layout">
        <Sidebar />
        {children}
      </div>
    </div>
  )
}
