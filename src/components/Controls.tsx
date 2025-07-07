import type { Filter } from "../lib/types";
import Button from "./ui/Button";

interface ControlsProps {
  left: number;
  filter: Filter;
  onClick: () => void;
  onChangeFilter: (ctx: Filter) => void;
}

export default function Controls({
  left,
  filter,
  onClick,
  onChangeFilter,
}: ControlsProps) {
  return (
    <div className="flex justify-between p-2 font-light text-neutral-500 border-t border-neutral-300">
      <div>{left} items left</div>
      <div className="flex gap-4">
        <Button
          onClick={() => onChangeFilter("all")}
          isActive={filter === "all"}
        >
          All
        </Button>
        <Button
          onClick={() => onChangeFilter("active")}
          isActive={filter === "active"}
        >
          Active
        </Button>
        <Button
          onClick={() => onChangeFilter("completed")}
          isActive={filter === "completed"}
        >
          Completed
        </Button>
      </div>
      <Button onClick={onClick}>Clear completed</Button>
    </div>
  );
}
