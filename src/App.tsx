import AppWrapper from "./components/layout/AppWrapper";
import TodoContainer from "./components/TodoContainer";
import TodoInput from "./components/TodoInput";
import type { Filter, Todo } from "./lib/types";
import TodoList from "./components/TodoList";
import { useEffect, useRef, useState } from "react";
import Controls from "./components/Controls";

export default function App() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  // Derived state
  const activeTodos = todos.filter((todo) => !todo.isCompleted);
  const completedTodos = todos.filter((todo) => todo.isCompleted);

  // Ref to focus input element of first page render
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handlers
  const handleAddTodo = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (todoText.trim() === "") return;

    if (evt.code.toLowerCase() === "enter") {
      setTodos((prev) => [
        ...prev,
        { text: todoText.trim(), isCompleted: false },
      ]);
      setTodoText("");
    }
  };

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const text = evt.target.value;
    setTodoText(text);
  };

  const handleCompleteTodo = (idx: number) => {
    setTodos((prev) =>
      prev.map((todo, i) =>
        i === idx ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  };

  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.isCompleted));
  };

  const handleChangeFilter = (ctx: Filter) => {
    setFilter(ctx);
  };

  // Helper
  const renderTodos = () => {
    switch (filter) {
      case "all":
        return todos;
      case "active":
        return activeTodos;
      case "completed":
        return completedTodos;
    }
  };

  const renderBlankTodos = () => {
    switch (filter) {
      case "all":
        return "There is no todos";
      case "active":
        return "There is no active todos";
      case "completed":
        return "There is no completed todos";
    }
  };

  return (
    <AppWrapper>
      <h1 className="text-3xl font-bold text-neutral-600">TODO Mindbox</h1>
      <TodoContainer>
        <TodoInput
          ref={inputRef}
          value={todoText}
          onChange={handleInputChange}
          onKeyDown={handleAddTodo}
        />
        {renderTodos().length === 0 ? (
          <h1 className="flex-1 flex justify-center items-center text-2xl font-light text-neutral-400">
            {renderBlankTodos()}
          </h1>
        ) : (
          <>
            <TodoList todos={renderTodos()} onChange={handleCompleteTodo} />
          </>
        )}
        <Controls
          left={activeTodos.length}
          filter={filter}
          onClick={handleClearCompleted}
          onChangeFilter={handleChangeFilter}
        />
      </TodoContainer>
    </AppWrapper>
  );
}
