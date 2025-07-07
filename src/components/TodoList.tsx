import type { Todo } from "../lib/types";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onChange: (idx: number) => void;
}

export default function TodoList({ todos, onChange }: TodoListProps) {
  return (
    <ul className="flex-1">
      {todos.map((todo, i) => (
        <TodoItem key={i} idx={i} todo={todo} onChange={onChange} />
      ))}
    </ul>
  );
}
