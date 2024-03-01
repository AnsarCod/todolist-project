import React, { useEffect, useReducer, useState } from "react";
import { addDoc, collection, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase"; // Import Firebase configuration
import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import "./Addtask.css";
import Todolist from "./Todolist";

// const initialTodos = [];
// const reducer = (state, action) => {
//   switch (action.type) {
//     case "COMPLETE":
//       return state.map((todo) => {
//         if (todo.id === action.id) {
//           return { ...todo, complete: !todo.complete };
//         } else {
//           return todo;
//         }
//       });
//     case "ADD":
//       return [...state, action.todo];
//     case "FAV":
//       return state.map((todo) => {
//         if (todo.id === action.id) {
//           return { ...todo, favourite: !todo.favourite };
//         } else {
//           return todo;
//         }
//       });
//     case "DEL":
//       return state.map((todo) => {
//         if (todo.id === action.id) {
//           return { ...todo, deleted: !todo.deleted };
//         } else {
//           return todo;
//         }
//       });

//     default:
//       return state;
//   }
// };

const Addtask = () => {
  // const [todos, dispatch] = useReducer(reducer, initialTodos);
  const [todos, setTodos] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const statusValue = (value) => {
    setStatus(value);
  };

  const filteredTodoList = () => {
    let sortedTodo = todos;

    if (status === "completed") {
      sortedTodo = sortedTodo.filter((todo) => todo.status === "completed");
    } else if (status === "deleted") {
      sortedTodo = sortedTodo.filter((todo) => todo.status === "deleted");
    } else if (status === "favourite") {
      sortedTodo = sortedTodo.filter((todo) => todo.favourite === true);
    } else {
      sortedTodo = sortedTodo?.filter((todo) => todo.status !== "deleted");
    }

    return sortedTodo;
  };

  const todoCollectionRef = collection(db, "todolist");

  const addHandle = async () => {
    if (!title || !description) {
      alert("PLease fill the field");
    } else {
      try {
        await addDoc(todoCollectionRef, {
          title: title,
          description: description,
        });
        getTodoList();
      } catch (err) {
        console.error(err);
      }
    }
    setTitle("");
    setDescription("");
  };
  const getTodoList = async () => {
    try {
      const data = await getDocs(todoCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <>
      <Container className="py-5">
        <Row>
          <Col lg={6}>
            {/* ADDTODO */}
            <div className="add-todo d-flex align-items-center justify-content-center py-4 bg-body-tertiary">
              <main
                className="form-todo  m-auto text-center"
                style={{ width: "60%" }}
              >
                <h1 className="h3 mb-3 fw-normal text-center">Add Todo</h1>
                <p className="text-center mb-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquet at eleifend feugiat vitae faucibus nibh dolor dui.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquet at eleifend feugiat vitae faucibus nibh dolor dui.
                </p>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                  <label htmlFor="floatingInput">Title</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                  <label htmlFor="floatingPassword">Description</label>
                </div>

                <button
                  className="btn btn-primary w-75 py-3"
                  onClick={() => addHandle()}
                >
                  Add Todo
                </button>
              </main>
            </div>
          </Col>
          <Col lg={6}>
            <Todolist todos={filteredTodoList()} status={statusValue} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Addtask;
