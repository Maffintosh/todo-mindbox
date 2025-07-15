import { FaCheck } from "react-icons/fa";
import { useAppDispatch } from "../../app/hooks";
import { todoToggled } from "../../features/todo/todo-slice";

interface CheckboxProps {
  idx: number;
  checked: boolean;
}

export default function Checkbox({ idx, checked }: CheckboxProps) {
  const dispatch = useAppDispatch();

  return (
    <label className="flex gap-2 items-center cursor-pointer">
      <input
        className="hidden"
        type="checkbox"
        checked={checked}
        onChange={() => dispatch(todoToggled(idx))}
      />
      <div className="flex justify-center items-center w-6 h-6 border-1 border-neutral-300 rounded-full">
        {checked && <FaCheck size={16} color="#57eb7c" />}
      </div>
    </label>
  );
}
