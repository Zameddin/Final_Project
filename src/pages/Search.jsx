import React, { useEffect, useContext } from 'react'
import Contextpage from '../Contextpage';
import Moviecard from '../components/Moviecard';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
// import { Pagebtn } from '../components/Pagebtn';
import { Link, useParams } from 'react-router-dom'
import { HiChevronLeft } from "react-icons/hi";
import './styles/Search.css'

function Search() {

    const { searchedMovies, loader, page, setPage, totalPage, setMovies, activegenre, filteredGenre, fetchSearch } = useContext(Contextpage);
    const { query } = useParams()

    useEffect(() => {
        // Call fetchSearch(query) only once when the component mounts
        fetchSearch(query);
    }, [query]); // Only re-run if 'query' or 'fetchSearch' changes

    return (
        <section>
            <Link to="/" className='search-link'><HiChevronLeft /></Link>
            <div className='search-container'>
                <Header />
                <motion.div
                    layout
                    className="search-layout">
                    <AnimatePresence>
                        {
                            loader ? <span className="loader m-10"></span> :
                                <>
                                        {searchedMovies.map((movie) => (
                                            <Moviecard key={movie.id} movie={movie} />
                                        ))}
                                </>
                        }
                    </AnimatePresence>
                </motion.div>

            </div>
        </section>

    )
}

export default Search
