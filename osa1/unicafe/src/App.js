import { useState } from "react";

const Statistics = (props) => {
  if (props.all === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.all} />
      <StatisticLine
        text="average"
        value={Math.round(((props.good - props.bad) / props.all) * 10) / 10}
      />
      <StatisticLine
        text="positive"
        value={Math.round(((props.good * 100) / props.all) * 10) / 10 + " %"}
      />
    </table>
  );
};

const StatisticLine = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.text} </td>
        <td>{props.value}</td>
      </tr>
    </tbody>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const moreGood = () => {
    setGood(good + 1);
    setAll(all + 1);
  };
  const moreNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  };
  const moreBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
  };

  return (
    <div className="App">
      <h2>give feedback</h2>
      <button onClick={moreGood}>good</button>
      <button onClick={moreNeutral}>neutral</button>
      <button onClick={moreBad}>bad</button>
      <h2>statistics</h2>

      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  );
}

export default App;
