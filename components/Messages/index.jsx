import Message from "../Message";
import styles from "./page.module.css"

export default function Messages({ messages }) {
  return (
    <div className={styles.main}>
      {messages?.map((message, idx) => {
        return <Message key={idx} message={message} />;
      })}
    </div>
  );
} 