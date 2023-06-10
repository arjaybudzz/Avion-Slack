import './index.css'
import { IoMenuOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoMdTime } from "react-icons/io";
import { IoOptionsSharp } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { IoHelpCircleOutline } from "react-icons/io5";

export default function Navbar() {
  return (
    <nav className="container">
      <div className="icon-cont">
          <IoMenuOutline className='icon'/>
      </div>
      
      <div className='nav-icon'>
        <IoIosArrowRoundBack />
        <IoIosArrowRoundForward  />
        <IoMdTime />
      </div>

      <div className='search-cont'>
        <input type="text" placeholder='Search Avion School' className='search'/>
        <div className='search-icont'>
          <IoOptionsSharp className='search-icon'/>
          <IoSearchOutline className='search-icon'/>
        </div>
      </div>

      <div>
        <IoHelpCircleOutline />
      </div>

    </nav>
  )
}
