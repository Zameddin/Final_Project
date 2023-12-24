import React, { useEffect, useContext } from 'react'
import Contextpage from '../Contextpage';
import {Helmet , HelmetProvider} from "react-helmet-async";
import './Styles/Genre.css'


function Genre() {
    const { fetchGenre, activegenre, setActiveGenre, genres, setMovies, page, setPage, filteredGenre } = useContext(Contextpage);    


    useEffect(() => {
        fetchGenre();  // Fetching Genres on Initial Render.
    }, [])


    return (
        <>
        <HelmetProvider>
        <Helmet>
            <title>ZamoFlix Movies | Home Page</title>
        </Helmet>
        </HelmetProvider>
        <div className='genre-container'>
            {
                genres.map((genre) => (

                    <button
                        onClick={() => setActiveGenre(genre.id)}
                        className={activegenre === genre.id ? 'active trueChoice' : 'falseChoice'} key={genre.id}>
                        {genre.name}
                    </button>

                ))
            }
            </div>
            </>
    )
}
export default Genre
