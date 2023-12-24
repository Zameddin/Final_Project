import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import Contextpage from '../Contextpage';
import { HiChevronLeft } from "react-icons/hi";
import noimage from '../assets/images/movies.jpg'
import { FaPlay } from "react-icons/fa";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import slugify from 'react-slugify';
import './Styles/Detail.css'
export const Detail = () => {
  const APIKEY = import.meta.env.VITE_API_KEY;

  const { loader, setLoader } = useContext(Contextpage);

  const { id } = useParams()

  const [moviedet, setMoviedet] = useState([]);
  const [castdata, setCastdata] = useState([]);
  const [moviegenres, setMoviegenres] = useState([]);
  const [video, setVideo] = useState([]);

  const fetchMovie = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=en-US`
    );
    const moviedetail = await data.json();
    setMoviedet(moviedetail);
    // console.log(moviedetail);
    setMoviegenres(moviedetail.genres);
    setLoader(false);
  };

  const fetchCast = async () => {
    const castdata = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${APIKEY}&language`
    );
    const castdetail = await castdata.json();
    setCastdata(castdetail.cast);
    setLoader(false);
  }

  const fetchVideo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${APIKEY}&language=en-US`
    );
    const videodata = await data.json();
    setVideo(videodata.results);

  }

  useEffect(() => {
    fetchMovie();
    fetchCast();
    fetchVideo();
  }, []);

  
  return (

    <>
      {
        loader ? <div className='detail-button'><span className="loader m-10"></span></div> :
          <>

            <Link to="/" className='detail-link'><HiChevronLeft /></Link>

            {/* poster */}
            <div className='poster'>
              <div className='poster-container'></div>
              <h1 className='poster-h1'>{moviedet.title}</h1>
              {moviedet.backdrop_path === null ? <img src={noimage} className='h-full w-full' /> : <img src={"https://image.tmdb.org/t/p/original/" + moviedet.backdrop_path} className='h-full w-full' />}
            </div>

            {/* overview */}
            <h2 className='overview'>{moviedet.overview}</h2>
            <div className='overview-container'>
              <h2 className='overview-h2'>Release Date : {moviedet.release_date}</h2>
            </div>

            {/* tag */}
            <div className='flex justify-center flex-wrap'>
              {moviegenres.map((tag) => (
                <>
                  <div key={tag.id} className='tag-name'>{tag.name}</div>
                </>
              ))}
            </div>

            {/* cast */}
            <div className='cast'>
              <h1 className="cast-h1">Cast</h1>

              <div className="cast-container">
                {castdata.map((cast) => (
                  <>
                    {cast.profile_path !== null ? <>
                      <div className='cast-div'>
                        <LazyLoadImage effect='blur' src={"https://image.tmdb.org/t/p/w500" + cast.profile_path} className="w-full h-full rounded-xl" />
                        <p className='text-white'>{cast.name}</p>
                        <p className='text-blue-300'>({cast.character})</p>
                      </div>
                    </> : null}
                  </>
                ))}
              </div>
            </div>

            {/* trailer */}
            <div className='trailer-container'>
              {Array.from(video).filter(trail => trail.type === "Trailer").map((trail, index) => (
                <>
                    <>
                      <a key={trail.id} href={'https://www.youtube.com/watch?v=' + trail.key} target="_blank" className='trailer-video'>
                        <FaPlay />Watch trailer {Array.from(video).filter(trail => trail.type === "Trailer").length>1?index+1:""}
                      </a>
                    </>
                </>
              ))
              }
            </div>

            {/* watch movie */}
            <div className='movie-watch'>
              <Link  to={`/player/${id}/${slugify(moviedet.title)}`} className='movie-video'>
                <FaPlay />Watch Movie
              </Link>
            </div>
          </>
      }
    </>
  )
}
