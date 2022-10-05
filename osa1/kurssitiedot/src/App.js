const Header = (props) => {
  return <h1> {props.course}</h1>;
};

const Content = (props) => {
  return (
    <div>
      <Part p={props.p1} ex={props.ex1} />
      <Part p={props.p2} ex={props.ex2} />
      <Part p={props.p3} ex={props.ex3} />
    </div>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.p} {props.ex}
    </p>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.ex1 + props.ex2 + props.ex3}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content
        p1={course.parts[0].name}
        ex1={course.parts[0].exercises}
        p2={course.parts[1].name}
        ex2={course.parts[1].exercises}
        p3={course.parts[2].name}
        ex3={course.parts[2].exercises}
      />
      <Total
        ex1={course.parts[0].exercises}
        ex2={course.parts[1].exercises}
        ex3={course.parts[2].exercises}
      />
    </div>
  );
};

export default App;
