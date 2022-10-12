import React from "react";
import Part from "./Part";

const Content = (props) => {
  return (
    <>
      {props.course.parts.map((item) => (
        <React.Fragment key={item.id}>
          <Part name={item.name} exercises={item.exercises} />
        </React.Fragment>
      ))}
    </>
  );
};

export default Content;
