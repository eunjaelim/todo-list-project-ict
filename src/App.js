import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";

function App() {
  // react way
  const [todos, setTodos] = useState([]);
  // ['할일1','할일2';]

  return (
    // JSX (html)
    // 자바스크립트 => {}괄호 안 작성
    <div className="App">
      <h1>TODO LIST</h1>
      <input />
      <button>ADD</button>
      <ul>
        <li>
          <input type="checkbox" />
          Task 1 <button>수정</button>
          <button>X</button>
          <input type="checkbox" />
          Task 2 <button>수정</button>
          <button>X</button>
        </li>
      </ul>
      {todos.map((todo, index) => {
        <div key={index}>
          <input type="checkbox" />
          <span>{todo}</span>
          <button>DEL</button>
        </div>;
      })}
    </div>
  );
}

export default App;
