import React from "react";
import { FaSearch } from "react-icons/fa";
import { Button, ButtonGroup } from "react-bootstrap";
import { CiMenuKebab } from "react-icons/ci";
import Dropdown from "react-bootstrap/Dropdown";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase";

const Todolist = ({ todos, status }) => {
  const completedTodo = async (id) => {
    const tododoc = doc(db, "todolist", id);
    await updateDoc(tododoc, { status: "completed" });
  };
  const favouriteTodo = async (id) => {
    const tododoc = doc(db, "todolist", id);

    await updateDoc(tododoc, { favourite: true });
  };
  const deletedTodo = async (id) => {
    const tododoc = doc(db, "todolist", id);
    await updateDoc(tododoc, { status: "deleted" });
  };
  return (
    <div>
      <div className="d-flex justify-content-between  mt-5 mb-2 align-items-center ">
        <div className="form-group has-search position-relative">
          <input
            type="text"
            className="form-control pl-5" // Add padding to accommodate the icon
            placeholder="Search"
          />
          <span
            className="position-absolute top-50 end-2 translate-middle-y"
            style={{ right: "10px" }}
          >
            <FaSearch />
          </span>
        </div>
        <Dropdown as={ButtonGroup}>
          <Button
            variant="light"
            style={{ border: "1px solid black", borderRight: "none" }}
          >
            Filter by
          </Button>
          <Dropdown.Toggle
            split
            variant="light"
            id="dropdown-split-basic"
            style={{ border: "1px solid black", borderLeft: "none" }}
          />
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                status("completed");
              }}
            >
              Completed
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                status("favourite");
              }}
            >
              Favourites
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                status("deleted");
              }}
            >
              Deleted
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {todos &&
        todos.map((todo) => {
          return (
            <div className="w-100 mt-5" key={todo.id}>
              <div
                key={todo.id}
                className="d-flex justify-content-between  mb-3 pb-2  align-items-center px-3"
                style={{ borderBottom: "2px solid #d9d9d9" }}
              >
                <div
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <h2>{todo.title}</h2>
                  <p>{todo.description}</p>
                </div>

                <Dropdown>
                  <Dropdown.Toggle variant="light">
                    <CiMenuKebab />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => completedTodo(todo.id)}>
                      Completed
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => favouriteTodo(todo.id)}>
                      Favourite
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => deletedTodo(todo.id)}>
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Todolist;
