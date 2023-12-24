import React, { useState, useEffect ,useContext} from 'react'
import { Link } from 'react-router-dom'
import noimage from '../assets/images/no-image.jpg'
import { motion } from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { AiFillStar, AiOutlineStar} from 'react-icons/ai';
import { toast } from 'react-toastify';
import Contextpage from '../Contextpage';
import './Styles/MovieCard.css'
function Moviecard({ movie }) {
    const { user } = useContext(Contextpage);

    const [isBookmarked, setIsBookmarked] = useState(null);

    useEffect(() => {
        if (localStorage.getItem(movie.id)) {
            setIsBookmarked(true);
        } else {
            setIsBookmarked(false);
        }
    }, [movie.id]);

    const BookmarkMovie = () => {
        if (!user) {
            toast.info("To bookmark this movie, please log in.");
        } else {
            setIsBookmarked(!isBookmarked)
            if (isBookmarked) {
                localStorage.removeItem(movie.id);
            } else {
                localStorage.setItem(movie.id, JSON.stringify(movie));
            }
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            layout
            className="card movieCard-motion">
            
            {/* bookmark buttons */}
            <button className="bookmark-buttons" onClick={BookmarkMovie}> {isBookmarked ? <AiFillStar /> : <AiOutlineStar/>}</button>

            
            <div className='card-container'>
                <h1 className='card-h1'>{movie.title || movie.name}</h1>

                {(movie.vote_average||0) > 7 ? <h1 className='font-green'>{(movie.vote_average||0).toFixed(1)}</h1> : (movie.vote_average||0) > 5.5 ? <h1 className='font-orange'>{(movie.vote_average||0).toFixed(1)}</h1> : <h1 className='font-red'>{(movie.vote_average||0).toFixed(1)}</h1>}
            </div>

            <Link to={`/moviedetail/${movie.id}`} className='movieDetail-button'></Link>

            <div>
                {movie.poster_path === null ? <img className='img object-cover' src={noimage} /> :
                    <LazyLoadImage effect='blur' className='img object-cover' src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />}
            </div>
        </motion.div>
    )
}

export default Moviecard
