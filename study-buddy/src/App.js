import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import axios from "axios";

import StudentCard from './components/StudentCard';
function App() {
  const [getStudents, setStudent] = useState([]);
  const getRandomStudents = () => {
    axios.get('http://localhost:8080/getRandomStudent').then((data) => {
      console.log(data)
      setStudent(data);
    })
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h2>Feeling a bit alone? It's alright!</h2>
        <h4>
          Darty StudyBuddy!!
        </h4>
        <button onClick={getRandomStudents}>
          Give me a study buddy!!
        </button>
        {getStudents.data ? (
    <>
    {console.log(getStudents.data)}
        <p>We got students!</p>
        <div className='cardHolder'>
          {
            getStudents.data.map((student) => (
              <>
              <div className='cardContainer'>
                <StudentCard student={student}/>
              </div>
              </>
            ))
          }
        </div>
    </>
) : null}
      </header>
    </div>
  );
}

export default App;
