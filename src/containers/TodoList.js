import React, { useCallback, useMemo, useEffect} from "react";
import { NavLink } from "react-router-dom";
import useRouter from "use-react-router";
//import { useDispatch } from "react-redux";

import { retrieveTodos, saveTodo } from "../actions/todos";

import useInput from "../hooks/useInput";
import useOnEnter from "../hooks/useOnEnter";
import useTodos from "../reducers/useTodos";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const router = useRouter();

  const [todos, { addTodo, deleteTodo, setDone, updateTodos}] = useTodos();
  const left = useMemo(() => todos.reduce((p, c) => p + (c.done ? 0 : 1), 0), [
    todos
  ]);

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await retrieveTodos();
      console.log(response.data)
      console.log(response.data.data)
      updateTodos(response.data)
    }
    fetchMyAPI()
    
  }, []);

  const visibleTodos = useMemo(
    () =>
      router.match.params.filter
        ? todos.filter(i =>
            router.match.params.filter === "active" ? !i.done : i.done
          )
        : todos,
    [todos, router.match.params.filter]
  );

  const anyDone = useMemo(() => todos.some(i => i.done), [todos]);
  const allSelected = useMemo(() => visibleTodos.every(i => i.done), [
    visibleTodos
  ]);

  const onToggleAll = useCallback(
    () => {
      visibleTodos.forEach(i => setDone(i.id, !allSelected));
    },
    [visibleTodos, allSelected]
  );

  const onClearCompleted = useCallback(
    () => {
      todos.forEach(i => {
        if (i.done) {
          deleteTodo(i.id);
        }
      });
    },
    [todos]
  );

  const [newValue, onNewValueChange, setNewValue] = useInput();
  const onAddTodo = useOnEnter(
    async () => {
      if (newValue) {
        addTodo(newValue);
        let res = saveTodo(newValue);
        console.log(res)
        setNewValue("");
      }
    },
    [newValue]
  );

  return (
    <React.Fragment>
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyPress={onAddTodo}
          value={newValue}
          onChange={onNewValueChange}
        />
      </header>

      <section className="main">
        <input
          id="toggle-all"
          type="checkbox"
          className="toggle-all"
          checked={allSelected}
          onChange={onToggleAll}
        />
        <label htmlFor="toggle-all" />
        <ul className="todo-list">
          {visibleTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </section>

      <footer className="footer">
        <span className="todo-count">
          <strong>{left}</strong> items left
        </span>
        <ul className="filters">
          <li>
            <NavLink exact={true} to="/" activeClassName="selected">
              All
            </NavLink>
          </li>
          <li>
            <NavLink to="/active" activeClassName="selected">
              Active
            </NavLink>
          </li>
          <li>
            <NavLink to="/completed" activeClassName="selected">
              Completed
            </NavLink>
          </li>
        </ul>
        {anyDone && (
          <button className="clear-completed" onClick={onClearCompleted}>
            Clear completed
          </button>
        )}
      </footer>
    </React.Fragment>
  );
}
