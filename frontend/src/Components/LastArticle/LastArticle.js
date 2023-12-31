import React, { useEffect, useState } from "react";
import SectionHeaders from "../SectionHeaders/SectionHeaders";
import ArticleBox from "../ArticleBox/ArticleBox";

export default function LastArticle() {
  const [articels, setArticels] = useState({});

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles`)
      .then((res) => res.json())
      .then((allArticles) => {
        setArticels(allArticles);
      });
  }, []);

  return (
    <>
      <section className="articles">
        <div className="container">
          <SectionHeaders
            title={"آخرین مقالات"}
            desc={"آخرین مقالات برنامه نویسی"}
            btnTitle={"مشاهده مقالات"}
            bthref={"articels/1"}
          />

          <div className="articles__content">
            <div className="row">
              {articels.length ? console.log("") : ""}

              {articels.length
                ? articels
                    .filter((article) => article.publish === 1)
                    .slice(0, 3)
                    .map((item, id) => {
                      return <ArticleBox key={item._id} {...item} />;
                    })
                : ""}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
