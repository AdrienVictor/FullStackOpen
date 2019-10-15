import React from 'react';

const Header = props => <h1>{props.course}</h1>;

const Total = props => {
  const exercises = props.parts.map(part => part.exercises);
  const total = exercises.reduce((acc, currV) => acc + currV);

  return <h4>total of {total} exercises</h4>;
};

const Part = props => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Content = props => {
  const parts = props.parts.map((part, i) => <Part key={i} part={props.parts[i]} />);
  return <div>{parts}</div>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}></Total>
    </div>
  );
};

export default Course;
