'use client';
import React from 'react'

const Navbar = () => {
    const openNav = () => {
        document.getElementById("mySidenav").style.width = "250px";
    }
    
    const closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
    }

  return (
   <>
        <div id="mySidenav" className='h-full w-0 fixed top-0 left-0 bg-sky-400 overflow-x-hidden transition pt-14'>
          <a href="#" onClick={closeNav} className="absolute top-4 right-6 ml-14">✖</a>
          <a href="#">About</a>
          <br />
          <a href="#">Services</a>
          <br />
          <a href="#">Clients</a>
          <br />
          <a href="#">Contact</a>
        </div>

        <span className="cursor-pointer" onClick={openNav}>
        <div className="bg-slate-800 mb-[5px] rounded-sm w-8 h-1"></div>
        <div className="bg-slate-800 mb-[5px] rounded-sm w-8 h-1"></div>
        <div className="bg-slate-800 mb-[5px] rounded-sm w-8 h-1"></div>
        </span>
   </>
  )
}

export default Navbar