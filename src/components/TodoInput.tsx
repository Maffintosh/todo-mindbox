import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { todoAdded } from "../features/todo/todo-slice";

export default function TodoInput() {
  const [todoText, setTodoText] = useState("");

  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleAddTodo = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (todoText.trim() === "") return;

    if (evt.code.toLowerCase() === "enter") {
      dispatch(todoAdded(todoText));
      setTodoText("");
    }
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const text = evt.target.value;
    setTodoText(text);
  };

  return (
    <input
      ref={inputRef}
      className="w-full text-lg py-2 px-8 text-neutral-500 placeholder-neutral-300 focus:outline-0 rounded-t-lg shadow"
      placeholder="What need to be done?"
      value={todoText}
      onChange={handleChange}
      onKeyDown={handleAddTodo}
    />
  );
}
