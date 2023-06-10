import { Link } from "next/link";
import Image from "next/image";
import avatar from "@/public/slack-avatar.png"
import styles from './page.module.css'

 function formatTime(time) {
    const date = new Date(time);
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }
  
export default function Message({ message }) {
  return (
    <div className={styles.maincont}>
      <div className={styles.chatcont}>
        <div>
        <Image src={avatar} width={30} height={30} alt="profile"/>
        </div>
        <div>
          <div className={styles.email}> 
          <h4>{message.sender.email}</h4>
            <span>
              {formatTime(message.created_at)}
              </span>
          </div>
          <p>
            {message.body}
            
          </p>
        </div>
      </div>
    </div>
  );
}
