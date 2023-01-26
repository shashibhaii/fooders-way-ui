import React from 'react';
import { Link } from 'react-router-dom';

function NavBar({ setIsauth }) {
  const navbarPhoneMenuToggler = () => {
    const navbarPhoneMenu = window.document.getElementById("navbar-phone-menu");

    if (navbarPhoneMenu.className.split(' ').includes("hidden"))
      navbarPhoneMenu.classList.remove("hidden");
    else
      navbarPhoneMenu.classList.add("hidden");
  }

  return (
    <>
      <nav id="navbar" className="md:flex md:flex-col md:items-center shadow-lg bg-[#313131]">
        <div id="navbar-items" className="px-2 md:px-0 flex justify-between items-center py-2 md:w-[82%] xl:w-[75%]">
          <div id="hamburger" onClick={navbarPhoneMenuToggler} className="xs:outline xs:outline-1 xs:outline-gray-300 xs:rounded xs:px-[12px] xs:py-1 xs:cursor-pointer md:hidden">
            <div className="bg-gray-300 my-1 h-0.5 w-5" />
            <div className="bg-gray-300 my-1 h-0.5 w-5" />
            <div className="bg-gray-300 my-1 h-0.5 w-5" />
          </div>
          <div className="flex justify-between space-x-9 py-1">
            <div id="navbar-title" className="flex justify-between items-center space-x-1 py-1 font-medium text-[12px] xs:text-base md:text-lg text-white">
              <i className="fa-brands fa-apple" />
              <div>FOODERSWAY</div>
            </div>
            <ul id="navbar-menu"
              className="hidden md:flex justify-between items-center space-x-5 py-1 font-medium text-white">
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/menu'>Menu</Link>
              </li>
              <li><Link to='#'>Order</Link></li>
              <li><Link to='#'>About</Link></li>
              <li><Link to='#'>Contact</Link></li>
            </ul>
          </div>
          <div id="navbar-icons"
            class="flex justify-between items-center space-x-6 sm:space-x-10 md:space-x-8 lg:space-x-10 py-1 text-white">
            <div className="font-bold cursor-pointer text-[12px] xs:text-base">
              <i className="fas fa-share"></i>
            </div>
            <div className="font-bold cursor-pointer text-[12px] xs:text-base">
              <i className="fa-sharp fa-solid fa-bell"></i>
            </div>
            <div className="font-bold cursor-pointer text-[12px] xs:text-base">
              <i className="fa-solid fa-power-off" onClick={() => {
                setIsauth(false);
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("businessId");
              }}></i>
            </div>
          </div>
        </div>
        <ul id="navbar-phone-menu" className="hidden px-2 py-2 md:hidden font-medium text-[14px] xs:text-base text-white">
          <Link className="flex items-center space-x-4 px-1 py-4 hover:bg-[#3b3b3b] hover:rounded" to='/'>
            <i className="fa-solid fa-house xs:text-xl"></i>
            <span>Home</span>
          </Link>
          <Link className="flex items-center space-x-4 px-1 py-4 hover:bg-[#3b3b3b] hover:rounded" to="/menu">
            <i className="fa-regular fa-rectangle-list xs:text-xl"></i>
            <span>Menu</span>
          </Link>
          <Link className="flex items-center space-x-5 px-1 py-4 hover:bg-[#3b3b3b] hover:rounded" to='#'>
            <i className="fa-solid fa-utensils xs:text-[22px]"></i>
            <span>Order</span>
          </Link>
          <Link className="flex items-center space-x-[18px] xs:space-x-4 px-1 py-4 hover:bg-[#3b3b3b] hover:rounded" to='#'>
            <i className="fa-solid fa-circle-info xs:text-2xl"></i>
            <span>About</span>
          </Link>
          <Link className="flex items-center space-x-4 px-1 py-4 hover:bg-[#3b3b3b] hover:rounded" to='#'>
            <i className="fa-solid fa-phone xs:text-[24px]"></i>
            <span>Contact</span>
          </Link>
        </ul>
      </nav>
    </>
  );
}

export default NavBar
