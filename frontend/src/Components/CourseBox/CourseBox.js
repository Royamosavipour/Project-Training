import React, { useState } from "react";
import CircleSpinner from "../CircleSpinner/CircleSpinner";

import "./CourseBox.css";
import { Link } from "react-router-dom";

export default function CourseBox(props) {
  const [isImageShow, setIsImageShow] = useState(false);
  const onImageLoder = () => setIsImageShow(true);
  const onImageError = () => {
    setIsImageShow("In not Found");
  };

  return (
    <>
      <div className="col-4" style={{ width: `${props.isSlider && "100%"}` }}>
        <div className="course-box">
          <Link to={`/course-info/${props.shortName}`}>
            <img
              src={`http://localhost:4000/courses/covers/${props.cover}`}
              // src="/images/courses/fareelancer.png"
              alt="Course img"
              className="course-box__img"
              onLoad={onImageLoder}
              onError={onImageError}
            />
            {!isImageShow && <CircleSpinner />}
          </Link>
          <div className="course-box__main">
            <Link
              to={`/course-info/${props.shortName}`}
              className="course-box__title"
            >
              {props.name}
            </Link>

            <div className="course-box__rating-teacher">
              <div className="course-box__teacher">
                <i className="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                <Link
                  to={`/course-info/${props.shortName}`}
                  className="course-box__teacher-link"
                >
                  {props.creator}
                </Link>
              </div>
              <div className="course-box__rating">
                {Array(5 - props.courseAverageScore)
                  .fill(0)
                  .map((star) => (
                    <img
                      src="/images/svgs/star.svg"
                      alt="rating"
                      className="course-box__star"
                    />
                  ))}
                {Array(props.courseAverageScore)
                  .fill(0)
                  .map((emptyStar) => (
                    <img
                      src="/images/svgs/star_fill.svg"
                      alt="rating"
                      className="course-box__star"
                    />
                  ))}
              </div>
            </div>

            <div className="course-box__status">
              <div className="course-box__users">
                <i className="fas fa-users course-box__users-icon"></i>
                <span className="course-box__users-text">
                  {props.registers}
                </span>
              </div>
              <span
                className="course-box__price"
                style={{ fontWeight:'bolder', color: "black", margin: "0" }}
              > 
                {props.price !== 0 &&
                  props.discount && `قیمت تخفیف ${((props.price * props.discount) / 100).toLocaleString()}`
                  }
              </span>
              <span
                className={`course-box__price ${
                  props.price !== 0 && props.discount ? "showDiscount" : ""
                }`}
              >
                {props.price === 0 ? "رایگان" : props.price.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="course-box__footer">
            <Link
              to={`/course-info/${props.shortName}`}
              className="course-box__footer-link"
            >
              مشاهده اطلاعات
              <i className="fas fa-arrow-left course-box__footer-icon"></i>
            </Link>
          </div>
          {props.discount && props.price !== 0 && (
            <span class="courses-box__discount">%{props.discount}</span>
          )}
        </div>
      </div>
    </>
  );
}
