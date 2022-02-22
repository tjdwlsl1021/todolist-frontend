
import React, { useState, useEffect } from "react";
import './App.css';
import axios from "axios";
import Input from "./components/input";
import Todo from "./components/todo";

function App() {

  const baseUrl = "http://localhost:8080"

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    getTodos();
  }, []) // []인 경우 한번만 실행

  async function getTodos() {
    await axios
      .get(baseUrl + "/todo") // get방식 호출
      .then((response) => { // 호출 후 값 받으면
        console.log(response.data)
        setTodos(response.data)
      })
      .catch((error) => { // 에러
        console.error(error)
      })

  }

  function insertTodo(e) {
    e.preventDefault();

    const insertTodo = async () => {
      await axios
        .post(baseUrl + "/todo", {
          todoName: input
        })
        .then((response) => {
          console.log(response.data)
          setInput("");
          getTodos();
        })
        .catch((error) => {
          console.log(error);
        })
    }

    insertTodo();
    console.log("할일이 추가됨")
  }

  function updateTodo(id) {
    console.log(id)

    const updateTodo = async () => {
      await axios
        .put(baseUrl + "/todo/" + id, {})
        .then((response) => {
          console.log(response.data)
          // setInput("");
          // getTodos();

          // 화면에서 변경처리 <- 디비 조회X
          setTodos(
            todos.map((todo) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
          )
        })
        .catch((error) => {
          console.log(error);
        })
    }

    updateTodo();
    console.log("할일이 수정됨")
  }

  function deleteTodo(id) {
    const deleteTodo = async () => {
      await axios
        .delete(baseUrl + "/todo/" + id, {})
        .then((response) => {
          console.log(response.data)
          // setInput("");
          // getTodos();

          // 화면에서 변경처리 <- 디비 조회X
          setTodos(
            todos.filter((todo) => todo.id !== id) // 같지 않으면 삭제.
          )
        })
        .catch((error) => {
          console.log(error);
        })
    }

    deleteTodo();
  }

  function changeText(e) {
    e.preventDefault(); // 이벤트가 다른거 못하게 막기
    setInput(e.target.value) // input값을 변경

  }

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <Input handleSubmit={insertTodo} input={input} handleChange={changeText} />

      {
        todos
          ? todos.map((todo) => {
            return (
              <Todo key={todo.id} todo={todo} handleClick={() => updateTodo(todo.id)} handleDelete={() => deleteTodo(todo.id)} />
            )
          })
          : null
      }
    </div>
  );
}

export default App;
