import React, { useContext } from 'react'
import Contextpage from '../Contextpage';
import { HiChevronLeft } from "react-icons/hi";
import './Styles/Header.css'
function Header() {

  const { header, backgenre } = useContext(Contextpage);

  return (
    <>
      <header className={`flex  items-center ${backgenre ? 'justify-center gap-10 md:justify-between' : 'justify-center'} text-3xl md:text-4xl font-bold text-blue-300 py-3 px-5 md:px-10`}>

        {backgenre ?
          <a href='/' className='header-h1'>
            <HiChevronLeft />
          </a>
          : null}

        {header}
      </header>

    </>
  )
}

export default Header