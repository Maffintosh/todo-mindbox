import type { Todo } from "../lib/types";
import Checkbox from "./ui/Checkbox";

interface TodoItemProps {
  idx: number;
  todo: Todo;
}

export default function TodoItem({ idx, todo }: TodoItemProps) {
  return (
    <li
      className={`w-full px-1 py-2 text-2xl font-light cursor-pointer border-b border-neutral-300/50 ${todo.isCompleted && "line-through"}`}
    >
      <label className="flex gap-4">
        <Checkbox idx={idx} checked={todo.isCompleted} />
        {todo.text}
      </label>
    </li>
  );
}
