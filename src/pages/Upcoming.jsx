import React, { useEffect, useContext } from 'react'
import Contextpage from '../Contextpage';
import Moviecard from '../components/Moviecard';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
// import { Pagebtn } from '../components/Pagebtn';
import { Helmet , HelmetProvider} from 'react-helmet-async';
import InfiniteScroll from 'react-infinite-scroll-component';
import './styles/Upcoming.css'


function Upcoming() {

  const { loader, setPage, page, fetchUpcoming, upcoming, totalPage } = useContext(Contextpage);

  useEffect(() => {
    setPage(1) // Reset Page to 1 on initial render.
  }, []);

  useEffect(() => {
    if (page > 0) {
      fetchUpcoming();
    }
  }, [page])


  return (
    <>
    <HelmetProvider>
      <Helmet>
        <title>ZamoFlix Movies | Upcoming movies</title>
      </Helmet>
      </HelmetProvider>
      <div className='upcoming-container'>
        <Header />
        <motion.div
          layout
          className="upcoming-layout">
          <AnimatePresence>
            {
              loader ? <span className="loader m-10"></span> :
                <>
                  <InfiniteScroll
                    className="upcoming"
                    dataLength={upcoming.length} //This is important field to render the next data
                    next={() => setPage(page + 1)}
                    hasMore={page < totalPage}
                    loader={<span className="loader m-10"></span>}
                    scrollThreshol={0.9}
                    style={{ overflow: 'hidden' }}
                  >

                    {upcoming.map((upc) => (
                      <Moviecard key={upc.id} movie={upc} />
                    ))}

                  </InfiniteScroll>

                </>
            }
          </AnimatePresence>
        </motion.div>
        {/* <Pagebtn /> */}

      </div>
    </>
  )
}

export default Upcoming