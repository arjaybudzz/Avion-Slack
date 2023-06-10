import Image from 'next/image'
import styles from './page.module.css'
import ChatBox from '@/components/ChatBox'
import Message from '@/components/Message'
import Messages from '@/components/Messages'

export default function Home() {
  return (
    <div>
      <Messages />
    </div>
  )
}
