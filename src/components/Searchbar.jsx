import React, { useContext, useState } from 'react'
import { Helmet , HelmetProvider } from 'react-helmet-async';
import Contextpage from '../Contextpage';
import { useNavigate } from 'react-router-dom';
import slugify from 'react-slugify';
import './Styles/SearchBar.css'

function Searchbar() {

  const { filteredGenre, fetchSearch, setBackGenre, setGenres } = useContext(Contextpage);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleSearch = () => {
      // Clear the previous timeout to prevent premature execution
      if (typingTimeout) {
          clearTimeout(typingTimeout);
      }

      // Set a new timeout
      const newTimeout = setTimeout(() => {
          onKeyUp(value);
      }, 500); // Adjust the timeout duration as needed (in milliseconds)

      setTypingTimeout(newTimeout);
  };

  const onKeyUp = (query) => {
    // console.log(query)
    if (query !== "") {
        query = query.trim();

      if (query === "") {
        navigate("/");
      } else {
        navigate(`/search/${slugify(query)}`)
      }
    }
  };

  return (
    <>
    <HelmetProvider>
    <Helmet>
        <title>ZamoFlix Movies</title>
    </Helmet>
    </HelmetProvider>
    <div className="searchBar-container">
      <div className='searchBar'>
        <input
          type="search"
          name="searchpanel"
          id="searchpanel"
          placeholder='Search Movie'
          className='inputStyle'
          onKeyUp={(e) => handleSearch()}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      </div>
      </>
  )
}

export default Searchbar