"use client"

import { useChannels } from '@/app/dataService';
import './index.css'
import React, { useState } from 'react';
import { IoAtOutline, IoChatbubblesOutline, IoBookmarkOutline, IoLayersOutline,
        IoEllipsisVerticalSharp, IoChevronDown,IoChatbubbleEllipsesOutline,
        IoSendOutline,IoCaretForwardOutline,IoCaretDownOutline } from "react-icons/io5";
import { IoMdList } from "react-icons/io";
import { RiContactsBookLine } from "react-icons/ri";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { clearStoredUser } from '@/storage/storeData';

export default function Sidebar() {
  const [channelArrow, setChannelArrow] =useState(false)
  const [dmArrow, setDmArrow] =useState(true)
  const [activeMenu, setActiveMenu] = useState(0);
  const [more, setMore] = useState(false);
  const [addChannel, setAddChannel] = useState(false);
  const { data: channels } = useChannels();

  const router = useRouter()
  const handleLogout = () =>{
    clearStoredUser()
    router.push("auth/login")

  }

  const handleMore =()=>{
    setMore(!more)
  }

  const handleChannel = () =>{
    setChannelArrow(!channelArrow);
  } 

  const handleDm = () =>{
    setDmArrow(!dmArrow);
  } 

  const handleAddChannel =() =>{
    setAddChannel(!addChannel)
  }


  const menu = [
    {id: 1, label: "Threads", icon: <IoChatbubbleEllipsesOutline /> , links: "dashboard/threads"},
    {id: 2, label: "Mentions & reactions", icon: <IoAtOutline /> , links: "dashboard/mentions"},
    {id: 3, label: "Drafts & sent", icon: <IoSendOutline /> , links: "dashboard/drafts"},
    {id: 4, label: "More", icon: <IoEllipsisVerticalSharp /> , links: '', onclick: handleMore },
  ]

  return (
    <div className='dashboard-cont'>
      <div className='avion' onClick={handleLogout}>
        <h3>Avion School <IoChevronDown /></h3>
      </div>
      <hr />
      <div className='menu-cont'>
        {
          menu.map(({id, label, icon, links, onclick}) =>
        
          <div className="menu-con" key={id}>
            <Link href={links} onClick={onclick}>
              <div className={`menu ${activeMenu === id ? 'active' : ''}`} onClick={() => setActiveMenu(id)}>{icon} {label}</div>
              </Link>
          </div>
          
          )
        }
      </div>
       {more && <div className='more-cont'>
        <div className='mores'>
          <p> <IoMdList /> Unreads</p>
          <p> <IoChatbubblesOutline /> Direct messages</p>
          <p> <IoBookmarkOutline />Later</p>
          <hr />
          <p> <IoLayersOutline /> Files</p>
          <p> <RiContactsBookLine /> People & user groups</p>
          <hr />
          <span>Customize this list in your preferences</span>
        </div>
      </div>} 
      
      <hr />


      <div className='channels-cont'>
      <div className='arrow'>
      {!channelArrow ? 
          (<IoCaretForwardOutline onClick={handleChannel}/>) :
          (<IoCaretDownOutline onClick={handleChannel}/>)
          }
        </div>
        <div>
          <span>Channels</span>
        </div>
      </div>
      {channelArrow && <div>
       
          {!!channels?.errors ? <p>{channels?.errors}</p> : null}
          {channels?.data?.map((channel) => {
            return (
              <div className="channels" key={channel.id}>
              <Link href={`dashboard/channels/${channel.id}`}
                key={channel.id}              >
                # {channel.name}
              </Link>
              </div>
            );
          })}

        <div className="channels" onClick={handleAddChannel} > <span>+</span> Add channel</div>
      </div>
      }

      {addChannel && <div className='addchannel' >
        <Link href="dashboard/channels/createchannels">
        <p>Create a new channel</p>
        </Link>
        <p>Browse channel</p>
      </div>}

       <div className='dm-cont'>
      <div className='arrow'>
      {dmArrow ? 
          (<IoCaretForwardOutline onClick={handleDm}/>) :
          (<IoCaretDownOutline onClick={handleDm}/>)
          }
        </div>
        <div>
          <span>Direct message</span>
        </div>
      </div>
      {!dmArrow &&
        <div className="dm"> Slackbot</div>
      }
  </div>
  )
}
