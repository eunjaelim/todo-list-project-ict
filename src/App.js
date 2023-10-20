import { v4 as uuid } from "uuid"; // uuid 모듈에서 v4 메서드를 사용할 수 있도록 불러옵니다.
import "./App.css"; // App 컴포넌트에 스타일을 적용하는 CSS 파일을 불러옵니다.
import { useState } from "react"; // React의 useState 훅을 사용하기 위해 불러옵니다.

function App() {
  const [inputValue, setInputValue] = useState(""); // 상태 변수 inputValue를 생성하고 초기값을 빈 문자열로 설정하며, 이를 업데이트할 setInputValue 함수를 생성합니다.

  const [todos, setTodos] = useState([]); // 할 일 목록을 저장할 todos 배열과 이를 업데이트할 setTodos 함수를 생성합니다.

  const [sort, setSort] = useState(); // 정렬 옵션을 저장하는 상태 변수 sort를 생성합니다.
  const [filter, setFilter] = useState(); // 필터 옵션을 저장하는 상태 변수 filter를 생성합니다.

  const computedTodos = todos
    .filter((todo) => {
      if (filter === "ALL") return true;
      if (filter === "DONE") return todo.isDone;
      if (filter === "NOT_DONE") return !todo.isDone;
      return true; // 필터가 설정되지 않았을 때는 모든 항목을 표시
    })
    .sort((a, b) => {
      if (sort === "none") return 0;
      if (sort === "createdAt") return a.createAt - b.createAt;
      if (sort === "content") return a.content.localeCompare(b.content);
      return 0; // 정렬 옵션이 설정되지 않았을 때는 정렬하지 않음
    });

  return (
    <div className="App">
      {" "}
      <h1>TODO LIST</h1>
      <div>
        <label htmlFor="sort">정렬 : </label>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="none">생성순</option>
          <option value="createdAt">최신순</option>
          <option value="content">가나다순</option>
        </select>
      </div>
      <div>
        <label>필터 : </label>
        <input
          type="radio"
          value="ALL"
          checked={filter === "ALL"}
          onChange={(e) => setFilter(e.target.value)}
        />
        <label>전체</label>
        <input
          type="radio"
          value="DONE"
          checked={filter === "DONE"}
          onChange={(e) => setFilter(e.target.value)}
        />
        <label>완료</label>
        <input
          type="radio"
          value="NOT_DONE"
          checked={filter === "NOT_DONE"}
          onChange={(e) => setFilter(e.target.value)}
        />
        <label>미완료</label>
      </div>
      <div>
        <input
          value={inputValue} // input 요소의 값(value)을 상태 변수 inputValue의 값과 연동하여 표시합니다.
          onChange={(e) => {
            setInputValue(e.target.value); // 입력값이 변경될 때 setInputValue 함수를 호출하여 상태를 업데이트합니다.
          }}
        />
        <button
          onClick={() => {
            const newTodo = {
              id: uuid(), // 고유한 id를 생성하기 위해 uuid 함수를 사용합니다.
              content: inputValue, // 입력된 내용을 할 일 항목의 내용으로 설정합니다.
              createAt: Date.now(), // 현재 시간을 기록하여 항목의 생성 시간을 설정합니다.
              isDone: false, // 할 일 항목이 완료되지 않았음을 나타내는 불리언 값입니다.
            };
            setTodos([...todos, newTodo]); // 새로운 할 일 항목을 기존 목록에 추가합니다.
            setInputValue(""); // 입력값을 초기화하여 빈 칸으로 만듭니다.
          }}
        >
          ADD
        </button>
      </div>
      {todos.map(
        (
          todo // 할 일 목록 배열을 순회하면서 각 항목을 렌더링합니다.
        ) => (
          <div key={todo.id}>
            {" "}
            <input
              type="checkbox"
              checked={todo.isDone} // 체크박스의 체크 상태를 할 일 항목의 완료 상태와 연동하여 표시합니다.
              onChange={(e) => {
                const nextTodos = todos.map((t) =>
                  t.id === todo.id ? { ...t, isDone: e.target.checked } : t
                );
                setTodos(nextTodos); // 완료 상태가 변경되면 할 일 목록을 업데이트합니다.
              }}
            />
            <span
              style={{
                textDecoration: todo.isDone ? "line-through" : "", // 완료된 항목에는 취소선을 적용합니다.
                fontSize: "small", // 글꼴 크기를 작게 설정합니다.
              }}
            >
              {todo.content}
            </span>
            <button
              onClick={() => {
                const filteredTodos = todos.filter((t) => t.id !== todo.id); // 삭제할 항목을 제외한 새로운 목록을 생성합니다.
                setTodos(filteredTodos); // 목록을 업데이트하여 항목을 삭제합니다.
              }}
            >
              DEL
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default App;
