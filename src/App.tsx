import { useState } from "react";
import { useAppSelector } from "./app/hooks";
import AppWrapper from "./components/layout/AppWrapper";
import TodoContainer from "./components/TodoContainer";
import TodoList from "./components/TodoList";
import Controls from "./components/Controls";

import type { Filter } from "./lib/types";
import EmptyView from "./components/EmptyView";

export default function App() {
  const [filter, setFilter] = useState<Filter>("all");

  // State from Store
  const todos = useAppSelector((state) => state.todo.todos);

  // Derived state
  const activeTodos = todos.filter((todo) => !todo.isCompleted);
  const completedTodos = todos.filter((todo) => todo.isCompleted);

  const handleChangeFilter = (ctx: Filter) => {
    setFilter(ctx);
  };

  // Helpers
  const renderTodos = (filter: Filter) => {
    const caseMap = {
      all: todos,
      active: activeTodos,
      completed: completedTodos,
    };

    return caseMap[filter];
  };

  return (
    <AppWrapper>
      <h1 className="text-3xl font-bold text-neutral-600">TODO Mindbox</h1>
      <TodoContainer>
        {renderTodos(filter).length === 0 && <EmptyView filter={filter} />}
        {renderTodos(filter).length !== 0 && (
          <TodoList todos={renderTodos(filter)} />
        )}
        <Controls
          itemsLeft={activeTodos.length}
          filter={filter}
          onChange={handleChangeFilter}
        />
      </TodoContainer>
    </AppWrapper>
  );
}
