import type { Filter } from "../lib/types";

interface EmptyViewProps {
  filter: Filter;
}

export default function EmptyView({ filter }: EmptyViewProps) {
  const renderBlankTodos = (filter: Filter) => {
    const caseMap = {
      all: "There is no todos",
      active: "There is no active todos",
      completed: "There is no completed todos",
    };

    return caseMap[filter];
  };

  return (
    <h1 className="flex-1 flex justify-center items-center text-2xl font-light text-neutral-400">
      {renderBlankTodos(filter)}
    </h1>
  );
}
