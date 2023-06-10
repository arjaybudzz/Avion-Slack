"use client"

import Link from "next/link";
import Messages from "@/components/Messages";
import ChatBox from "@/components/ChatBox"
import {useMessages, useChannelDetails} from "@/app/dataService";
import { BiChevronDown } from "react-icons/bi";
import { useParams } from 'next/navigation'
import styles from "./page.module.css"

export default function ChannelMessage() {
  const  {id}  = useParams();
  const { details } = useChannelDetails(id);
  const { messages } = useMessages(id, "Channel");
  return (
    <div className={styles.main}>
      <div >
        <Link href={`dashboard/channels/${id}/invite`} className={styles.channelname}>
          {details.name} <BiChevronDown />
        </Link>
      </div>
      <hr />
      <Messages messages={messages} />
      <ChatBox id={id} type="Channel" />
    </div>
  );

}