import React, { useEffect, useState } from "react";
import "./App.css";
import Footer1 from "./Footer1.js";
import Footer from "./Footer.js";

function App() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [username, setUsername] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [started, setStarted] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [rank, setRank] = useState(null);
  const [friendshipLevel, setFriendshipLevel] = useState("very Good");

  useEffect(() => {
    fetch("https://quiz-app-backend-87do.onrender.com/api/quiz")
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);


  useEffect(() => {
    if (score !== null) {
      fetch("https://quiz-app-backend-87do.onrender.com/api/leaderboard")
        .then(res => res.json())
        .then(data => {
          setLeaderboard(data);
          const foundIndex = data.findIndex(entry => entry.username === username);
          if (foundIndex !== -1) {
            setRank(foundIndex + 1);
          }
        });
      console.log("Rank:", rank);
    }
    if(score && score.score === 10) {
      setFriendshipLevel("Outstanding");
    }
    else if(score && score.score >= 7) {
      setFriendshipLevel(" Very Good");
    }
    else if(score && score.score >= 5) {
      setFriendshipLevel("Good");
    }
    else if(score && score.score >= 3) {
      setFriendshipLevel("Not bad");
    }
    else if(score && score.score >= 1) {
      setFriendshipLevel("bad");
    }
    else {
      setFriendshipLevel("Very Bad");
    }
  }, [score]);

  const handleEnter = async() => {
try {
  const res = await fetch("https://quiz-app-backend-87do.onrender.com/api/quiz/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username })
  });

  const data = await res.json();
  console.log(data);

  if (res.status === 200) {
    alert("You have already done this Quiz game");
    setScore(data.data);
    return;
  } else {
    setStarted(true);
  }
} catch (error) {
  console.error("Error during fetch:", error);
}


   

  }


  const handleAnswer = (answer) => {
    const updated = [...answers];
    updated[current] = { question: current, answer };
    setAnswers(updated);
    setSelectedAnswer(answer);
  };

  const goToNext = () => {
    if(selectedAnswer === null){
      alert("Please select an answer before procceding.");
      return;
    }
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelectedAnswer(answers[current + 1]?.answer || null);
    } else {
      setShowSubmit(true);
    }
  };

  const goToPrevious = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setSelectedAnswer(answers[current - 1]?.answer || null);
    }
  };

  const handleSubmit = () => {
    fetch("https://quiz-app-backend-87do.onrender.com/api/quiz/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers, username })
    })
      .then(res => res.json())
      .then(data => setScore(data));
  };

  if (!questions.length) return <div>Loading...</div>;
  const unansweredCount = questions.length - answers.filter(a => a?.answer !== undefined && a?.answer !== "").length;

  console.log(score);
  if (score) return (
    <>
    <div className="quiz-container colorful">
      <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Name: {username}</h2>
          <h2>Score: {score.score} / {questions.length}</h2>
          <h2>Rank: {rank}</h2>
        </div>
        <div style={{height:"auto"}}>
          <div id="friendship_div" className="friendship-level" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span>FriendShip Level</span>
            <span>{friendshipLevel}</span>
          </div>

        </div>
      </div>

      <div className="summary" style={{ display: "flex",alignItems:"center", justifyContent: 'space-around', borderRadius: "10px", backgroundColor: "green", color: "white" }}>
        <p>✔ Correct: {score.score}</p>
        <p>✖ Wrong: {questions.length - score.score}</p>
        <p>⚠ Unanswered: 0</p>

      </div>
      <h3 style={{marginTop:"10px"}}>Leaderboard:</h3>
      {/* <ol>
        {leaderboard.map((entry, i) => (
          <li key={i}>{entry.username}: {entry.score}/{entry.total}</li>
        ))}
      </ol> */}
      <table>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Full Marks</th>
          <th>Score</th>
        </tr>
        {leaderboard.map((entry, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{entry.username}</td>
            <td>{questions.length}</td>
            <td>{entry.score}</td>
          </tr>
        ))}

      </table>
      
    </div>
    <Footer/>
    </>
  );

  const q = questions[current];

  return (
    <>
    <div className="quiz-container colorful">
      {!started ? (
        <div className="start-container" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <p style={{ fontWeight: "bold" }}>Let's Play a Quiz Game With Akash to prove How much Know him?</p>
          <input
            className="username-input"
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button
            className="enter-button"
            onClick={handleEnter}
            disabled={!username.trim()}
            style={{ margin: "auto", padding: "5px 10px", backgroundColor: "blueviolet", color: "white", borderRadius: "5px", cursor: "pointer" }}
          >
            Enter Quiz
          </button>
        </div>
      ) : (
        <>
          <h2>{q.question}</h2>
          {q.type !== "open" ? (
            q.options.map((opt, i) => (
              <button
                key={i}
                className={`answer-button ${selectedAnswer === opt ? "selected" : ""}`}
                onClick={() => handleAnswer(opt)}
              >
                {opt}
              </button>
            ))
          ) : (
            <input
              type="text"
              value={selectedAnswer || ""}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              onBlur={(e) => handleAnswer(e.target.value)}
            />
          )}
          <div className="nav-buttons">
            <button onClick={goToPrevious}>Previous</button>
            <button onClick={goToNext}>Next</button>
          </div>
          {showSubmit && (
            <button className="submit-button" onClick={handleSubmit}>Submit Quiz</button>
          )}
        </>
      )}
     
    </div>
     <Footer1/>
    </>
  );
}

export default App;
