import React, { useContext, useEffect } from 'react'
import Contextpage from '../Contextpage';
import Button from '../assets/Btn'
import { HiChevronUp } from "react-icons/hi";
import './Styles/Pagebtn.css'
export const Pagebtn = () => {

    const { setPage, page } = useContext(Contextpage);

    return (
        <>
            <div className='btnpanel flex justify-center items-center'>
                <a href='#' onClick={() => setPage(page - 1)}><Button item="Back" /></a>
                <div className='pageBtn-container'>{page}</div>
                <a href='#' onClick={() => setPage(page + 1)}><Button item="Next" /></a>
            </div>

        </>
    )
}
