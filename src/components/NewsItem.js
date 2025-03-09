import React from "react";

const NewsItem=(props)=>{ 

    let { title, description, imageUrl, newsUrl, author, date ,source} = props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{source}
          </span>
          <img
            src={imageUrl ? imageUrl : ""}
            style={{ height: "160px" }}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title ? title : ""}</h5>
            <p className="card-text">{description ? description : ""}</p>
            <div className="text-center">
              <a
                href={newsUrl ? newsUrl : ""}
                rel="noreferal"
                className="btn btn-sm btn-primary"
              >
                read more
              </a>
            </div>

            <div
              className="card-footer"
              style={{ padding: "0px", marginTop: "8px", height: "100%" }}
            >
              <small className="text-body-secondary">
                By {author ? author : "unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </div>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItem;
