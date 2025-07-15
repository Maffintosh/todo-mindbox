import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Todo } from "../../lib/types";

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    todoAdded(state, action: PayloadAction<string>) {
      const newTodo: Todo = { text: action.payload.trim(), isCompleted: false };
      return { todos: [...state.todos, newTodo] };
    },
    todoToggled(state, action: PayloadAction<number>) {
      return {
        todos: [
          ...state.todos.map((todo, idx) =>
            idx === action.payload
              ? { ...todo, isCompleted: !todo.isCompleted }
              : todo,
          ),
        ],
      };
    },
    completedTodoCleared(state) {
      return {
        todos: [...state.todos.filter((todo) => !todo.isCompleted)],
      };
    },
  },
});

export const { todoAdded, completedTodoCleared, todoToggled } =
  todoSlice.actions;
export default todoSlice.reducer;
