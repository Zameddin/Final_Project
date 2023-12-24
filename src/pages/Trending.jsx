import React, { useEffect, useContext } from 'react'
import Contextpage from '../Contextpage';
import Moviecard from '../components/Moviecard';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
// import { Pagebtn } from '../components/Pagebtn';
import { Helmet , HelmetProvider } from 'react-helmet-async';
import InfiniteScroll from 'react-infinite-scroll-component';
import './styles/Trending.css'


function Trending() {

    const { loader, page, setPage, fetchTrending, trending, totalPage } = useContext(Contextpage);

    useEffect(() => {
        setPage(1) // Reset Page to 1 on initial render.
    }, []);

    useEffect(() => {
        if (page > 0) {
            fetchTrending();
        }
    }, [page])


    return (
        <>
        <HelmetProvider>
            <Helmet>
                <title>ZamoFlix Movies | Trending</title>
            </Helmet>
            </HelmetProvider>

            <div className='trend-container'>
                <Header />
                <motion.div
                    layout
                    className="trend-layout">
                    <AnimatePresence>
                        {
                            loader ? <span className="loader m-10"></span> :
                                <>
                                    <InfiniteScroll
                                        className="trending"
                                        dataLength={trending.length} //This is important field to render the next data
                                        next={() => setPage(page + 1)}
                                        hasMore={page < totalPage}
                                        loader={<span className="loader m-10"></span>}
                                        scrollThreshol={0.9}
                                        style={{ overflow: 'hidden' }}
                                    >

                                        {trending.map((tred) => (
                                            <Moviecard key={tred.id} movie={tred} />
                                        ))}

                                    </InfiniteScroll>

                                </>
                        }
                    </AnimatePresence>
                </motion.div>
              

            </div>
        </>
    )
}

export default Trending