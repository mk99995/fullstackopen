import React from "react";

const Total = (props) => {
  let all = props.course.parts.reduce(
    (total, item) => total + item.exercises,
    0
  );
  return <b>total of {all} exercises</b>;
};

export default Total;
