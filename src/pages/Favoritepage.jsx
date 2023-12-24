import React, { useEffect, useContext, useState } from 'react'
import Header from '../components/Header';
import Contextpage from '../Contextpage';
import Moviecard from '../components/Moviecard';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet , HelmetProvider} from 'react-helmet-async';
import './styles/Favoritepage.css'


function Favoritepage() {

    const { loader, GetFavorite } = useContext(Contextpage);
    const [localStorageData, setLocalStorageData] = useState([]);

    useEffect(() => {
        GetFavorite();

        const data = localStorage;
        setLocalStorageData(data);
    }, []);

    return (
        <>
        <HelmetProvider>
          <Helmet>
            <title>ZamoFlix Movies | Favorite Movies</title>
          </Helmet>
          </HelmetProvider>
            <div className='farorite-header'>
                <Header />
                <motion.div
                    layout
                    className="favorite-movies">
                    <AnimatePresence>
                        {
                            loader ? <span className="loader m-10"></span> :
                                <>
                                    {
                                        Object.keys(localStorageData).filter(key => !isNaN(key)).length == 0
                                            ?
                                            <p className="text-xl text-white">No Bookmark Yet!</p>
                                            :
                                            Object.keys(localStorageData).filter(key => !isNaN(key)).map((key, index) => (<Moviecard key={index} movie={{ ...JSON.parse(localStorageData[key]) }} />))
                                    }
                                </>
                        }
                    </AnimatePresence>
                </motion.div>
            </div>
        </>
    )
}

export default Favoritepage