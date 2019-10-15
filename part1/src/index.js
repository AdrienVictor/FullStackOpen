import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>;

const Statistic = ({ text, value }) => (
  <table>
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  </table>
);

const Statistics = ({ good, bad, neutral }) => {
  const all = good + bad + neutral;
  const average = (good - bad) / all;
  const positive = `${(good / all) * 100}%`;
  if (all !== 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <Statistic text='good' value={good} />
        <Statistic text='neutral' value={neutral} />
        <Statistic text='bad' value={bad} />
        <Statistic text='all' value={all} />
        <Statistic text='average' value={average} />
        <Statistic text='positive' value={positive} />
      </div>
    );
  }
  return (
    <div>
      <h2>Statistics</h2>
      <p>No feedback given</p>
    </div>
  );
};

const App = props => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const [selected, setSelected] = useState(0);
  const points = Array.apply(null, new Array(10)).map(Number.prototype.valueOf, 0);
  const [votes, setVotes] = useState(points);
  const best = votes.indexOf(Math.max(...votes));
  return (
    <div>
      <div>
        Unicafe
        <h2>Give feedback</h2>
        <Button handleClick={() => setGood(good + 1)} text='Good' />
        <Button handleClick={() => setNeutral(neutral + 1)} text='Neutral' />
        <Button handleClick={() => setBad(bad + 1)} text='Bad' />
        <Statistics good={good} bad={bad} neutral={neutral} />
      </div>

      <hr />

      <div>
        Anecdotes
        <h2>Anecdote of the day</h2>
        <p>{props.anecdotes[selected]}</p>
        <p>Has {votes[selected]} votes</p>
        <Button
          handleClick={() => setSelected(Math.floor(Math.random() * 5))}
          text='next anecdote'
        />
        <Button
          handleClick={() =>
            setVotes(votes.map((vote, index) => (index === selected ? vote + 1 : vote)))
          }
          text='Vote'
        />
        <h2>Anecdote with most votes</h2>
        <p>{props.anecdotes[best]}</p>
        <p>Has {votes[best]} votes</p>
      </div>
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
