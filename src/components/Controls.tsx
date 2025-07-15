import { useAppDispatch } from "../app/hooks";
import { completedTodoCleared } from "../features/todo/todo-slice";
import type { Filter } from "../lib/types";
import Button from "./ui/Button";

interface ControlsProps {
  itemsLeft: number;
  filter: Filter;
  onChange: (ctx: Filter) => void;
}

export default function Controls({
  itemsLeft,
  filter,
  onChange,
}: ControlsProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-between p-2 font-light text-neutral-500 border-t border-neutral-300">
      <div>{itemsLeft} items left</div>
      <div className="flex gap-4">
        <Button onClick={() => onChange("all")} isActive={filter === "all"}>
          All
        </Button>
        <Button
          onClick={() => onChange("active")}
          isActive={filter === "active"}
        >
          Active
        </Button>
        <Button
          onClick={() => onChange("completed")}
          isActive={filter === "completed"}
        >
          Completed
        </Button>
      </div>
      <Button onClick={() => dispatch(completedTodoCleared())}>
        Clear completed
      </Button>
    </div>
  );
}
