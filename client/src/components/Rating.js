import React from "react";
import { FaRegStar, FaStarHalf, FaStar } from "react-icons/fa";

export default function Rating(props) {
  return !props.value ? (
    <div></div>
  ) : (
    <div className="rating">
      <span>
        {props.value >= 1 ? (
          <FaStar />
        ) : props.value >= 0.5 ? (
          <FaStarHalf />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {props.value >= 2 ? (
          <FaStar />
        ) : props.value >= 1.5 ? (
          <FaStarHalf />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {props.value >= 3 ? (
          <FaStar />
        ) : props.value >= 2.5 ? (
          <FaStarHalf />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {props.value >= 4 ? (
          <FaStar />
        ) : props.value >= 3.5 ? (
          <FaStarHalf />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {props.value >= 5 ? (
          <FaStar />
        ) : props.value >= 4.5 ? (
          <FaStarHalf />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>{props.text ? props.text : ""}</span>
    </div>
  );
}
