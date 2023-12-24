import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Contextpage from '../Contextpage';
import { motion } from "framer-motion";
import { HiMenuAlt1, HiX } from "react-icons/hi";
import User from '../assets/images/User.jpg';
import { auth } from '../../firebase';
import { toast } from "react-toastify";
import './Styles/Navbar.css'
import logo from '../assets/logo.png'
function Navbar() {

    const { header, user } = useContext(Contextpage);
    const [activemobile, setActivemobile] = useState(false);

    // console.log(user)
    const Navdata = [
        {
            id: 1,
            headername: "Genres",
            Name: "Home",
            link : "/"
        },
        {
            id: 2,
            headername: "Trending Movies",
            Name: "Trending",
            link:"/trending"
        },
        {
            id: 3,
            headername: "Upcoming Movies",
            Name: "Upcoming",
            link:"/upcoming"
        },
        {
            id: 4,
            headername: "Favorite Movies",
            Name: "Favorites",
            link:"/favorite"
        }
    ]

    return (
        <>
            {/* mobilebutton */}
            <button className="mobileButton" onClick={() => setActivemobile(!activemobile)}>
                {activemobile ? <HiX /> : <HiMenuAlt1 />}
            </button>

            <nav className={`${activemobile ? 'block' : 'hidden'} fixed bg-black/90 md:bg-black h-full w-full md:w-[15rem] z-30 md:block`}>
                <motion.div
                    animate={{ scale: 1 }}
                    initial={{ scale: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Link to="/" className="logo logo-link" onClick={() => setActivemobile(!activemobile)}>
                    <img src={logo} alt="logo" className="w-24" />
                        <h1 className="logoName">ZamoFlix</h1>
                    </Link>
                </motion.div>


                <ul className="navbar-menu">
                    {Navdata.map((data) => (
                            <Link key={data.id} to={data.link}><li className={`${header == data.headername ? 'bg-blue-500/20 border-blue-600 text-white' : 'bg-gray-500/20 border-black'} p-2 my-2  hover:bg-blue-500/20 rounded-[5px] border-2 hover:border-blue-600`} onClick={() => setActivemobile(!activemobile)}>{data.Name}</li></Link>
                    ))}

                </ul>

                {/* Loginsection */}

                <div className="loginSection-container">
                    {user ? <>
                        <div className="loginSection">
                            <img src={user.photoURL == null ? User : user.photoURL} alt="user" className="h-10 rounded-full" />
                            <h1>{user.displayName}</h1>
                        </div>

                        <div className="checkLogin" onClick={() => auth.signOut(toast.error("Logout successfully"))}>
                            <h1>Logout</h1>
                        </div>
                    </>
                        :
                        <>
                            <Link to="/login" className="login-link" onClick={() => setActivemobile(!activemobile)}>
                                <h1>Log in</h1>
                            </Link>
                        </>
                    }
                </div>
            </nav>
        </>
    )
}

export default Navbar
