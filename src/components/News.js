import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    //https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=030e772ccee44f47a39c89db287c7c5f&page=1&pageSize=5
    const url2 = `
https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url2);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);

    if (parsedData.articles) {
      // ✅ Ensure articles exist before updating state
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
    } else {
      console.log("No articles found");
      setArticles([]); // ✅ Prevents undefined state
      setTotalResults(0);
    }

    setLoading(false);
    props.setProgress(100);
  };


  useEffect(() => {
    const fetchNews = async () => {
      await updateNews();
    };
    fetchNews();
  }, [props.country,props.category,props.apiKey,props.pageSize]); // ✅ Runs only when category changes
  


  const fetchMoreData = async () => {
    setPage(page + 1); // ✅ Increment page number
    const url2 = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url2);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      
      <InfiniteScroll
        dataLength={articles ? articles.length : 0} // ✅ Ensures no undefined errors
        next={fetchMoreData}
        hasMore={articles ? articles.length !== totalResults : false}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element, index) => {
              if (!element) return null; // ✅ Skip undefined elements

              return (
                <div
                  className="col-md-4"
                  key={element.url ? element.url : index}
                >
                  <NewsItem
                    title={element.title || "No Title Available"} // ✅ Default fallback
                    description={element.description || "No Description"}
                    imageUrl={
                      element.urlToImage || "https://via.placeholder.com/150"
                    } // ✅ Placeholder image
                    newsUrl={element.url || "#"}
                    author={element.author || "Unknown"}
                    date={element.publishedAt || "Date Not Available"}
                    source={element.source?.name || "Unknown Source"}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;

// import React, {useEffect, useState} from 'react'

// import NewsItem from './NewsItem'
// import Spinner from './Spinner';
// import PropTypes from 'prop-types'
// import InfiniteScroll from "react-infinite-scroll-component";

// const News = (props)=>{
//     const [articles, setArticles] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [page, setPage] = useState(1)
//     const [totalResults, setTotalResults] = useState(0)

//     const capitalizeFirstLetter = (string) => {
//         return string.charAt(0).toUpperCase() + string.slice(1);
//     }

//     const updateNews = async ()=> {
//         props.setProgress(10);
//         const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
//         const url2 = `https://newsapi.org/v2/everything?q=apple&from=2025-03-08&to=2025-03-08&sortBy=popularity&apiKey=${props.apiKey}`;
//         setLoading(true)
//         let data = await fetch(url2);
//         props.setProgress(30);
//         let parsedData = await data.json()
//         props.setProgress(70);
//         setArticles(parsedData.articles)
//         setTotalResults(parsedData.totalResults)
//         setLoading(false)
//         props.setProgress(100);
//     }

//     useEffect(() => {
//         document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
//         updateNews();
//         // eslint-disable-next-line
//     }, [])

//     const fetchMoreData = async () => {
//         const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
//         const url2 = `https://newsapi.org/v2/everything?q=apple&from=2025-03-08&to=2025-03-08&sortBy=popularity&apiKey=${props.apiKey}`;

//         setPage(page+1)
//         let data = await fetch(url2);
//         let parsedData = await data.json()
//         setArticles(articles.concat(parsedData.articles))
//         setTotalResults(parsedData.totalResults)
//       };

//         return (
//             <>
//                 <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
//                 {loading && <Spinner />}
//                 <InfiniteScroll
//                     dataLength={articles.length}
//                     next={fetchMoreData}
//                     hasMore={articles.length !== totalResults}
//                     loader={<Spinner/>}
//                 >
//                     <div className="container">

//                     <div className="row">
//                         {articles.map((element) => {
//                             return <div className="col-md-4" key={element.url}>
//                                 <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
//                             </div>
//                         })}
//                     </div>
//                     </div>
//                 </InfiniteScroll>
//             </>
//         )

// }

// News.defaultProps = {
//     country: 'in',
//     pageSize: 8,
//     category: 'general',
// }

// News.propTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string,
// }

// export default News
