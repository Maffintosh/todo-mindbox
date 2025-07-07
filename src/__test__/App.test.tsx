import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import App from "../App";

describe("App", () => {
  it("adds a new todo when Enter is pressed", async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByPlaceholderText("What need to be done?");

    await user.type(input, "New todo item");
    await user.keyboard("{Enter}");

    expect(screen.getByText("New todo item")).toBeInTheDocument();
    expect(input).toHaveValue("");
    expect(screen.getByText("1 items left")).toBeInTheDocument();
  });

  it("does not add empty todos", async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByPlaceholderText("What need to be done?");

    await user.type(input, "   ");
    await user.keyboard("{Enter}");

    expect(screen.getByText("There is no todos")).toBeInTheDocument();
    expect(screen.getByText("0 items left")).toBeInTheDocument();
  });

  it("trims whitespace from todo text", async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByPlaceholderText("What need to be done?");

    await user.type(input, "  Todo with spaces  ");
    await user.keyboard("{Enter}");

    expect(screen.getByText("Todo with spaces")).toBeInTheDocument();
    expect(screen.queryByText("  Todo with spaces  ")).not.toBeInTheDocument();
  });

  it("displays correct count of active todos", async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByPlaceholderText("What need to be done?");

    // Add multiple todos
    await user.type(input, "Active todo 1");
    await user.keyboard("{Enter}");

    await user.type(input, "Active todo 2");
    await user.keyboard("{Enter}");

    await user.type(input, "Todo to complete");
    await user.keyboard("{Enter}");

    expect(screen.getByText("3 items left")).toBeInTheDocument();

    // Complete one todo
    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[2]);

    expect(screen.getByText("2 items left")).toBeInTheDocument();
  });

  it("filters todos correctly - All filter", async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByPlaceholderText("What need to be done?");

    // Add todos
    await user.type(input, "Active todo");
    await user.keyboard("{Enter}");

    await user.type(input, "Completed todo");
    await user.keyboard("{Enter}");

    // Complete one todo
    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[1]);

    const allButton = screen.getByText("All");
    await user.click(allButton);

    expect(screen.getByText("Active todo")).toBeInTheDocument();
    expect(screen.getByText("Completed todo")).toBeInTheDocument();
  });

  it("filters todos correctly - Active filter", async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByPlaceholderText("What need to be done?");

    // Add todos
    await user.type(input, "Active todo");
    await user.keyboard("{Enter}");

    await user.type(input, "Completed todo");
    await user.keyboard("{Enter}");

    // Complete one todo
    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[1]);

    const activeButton = screen.getByText("Active");
    await user.click(activeButton);

    expect(screen.getByText("Active todo")).toBeInTheDocument();
    expect(screen.queryByText("Completed todo")).not.toBeInTheDocument();
  });

  it("filters todos correctly - Completed filter", async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByPlaceholderText("What need to be done?");

    // Add todos
    await user.type(input, "Active todo");
    await user.keyboard("{Enter}");

    await user.type(input, "Completed todo");
    await user.keyboard("{Enter}");

    // Complete one todo
    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[1]);

    const completedButton = screen.getByText("Completed");
    await user.click(completedButton);

    expect(screen.queryByText("Active todo")).not.toBeInTheDocument();
    expect(screen.getByText("Completed todo")).toBeInTheDocument();
  });

  it("shows appropriate message when no todos match filter", async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByPlaceholderText("What need to be done?");

    // Add only active todos
    await user.type(input, "Active todo");
    await user.keyboard("{Enter}");

    const completedButton = screen.getByText("Completed");
    await user.click(completedButton);

    expect(screen.getByText("There is no completed todos")).toBeInTheDocument();
  });

  it("clears completed todos", async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByPlaceholderText("What need to be done?");

    // Add todos
    await user.type(input, "Active todo");
    await user.keyboard("{Enter}");

    await user.type(input, "Completed todo 1");
    await user.keyboard("{Enter}");

    await user.type(input, "Completed todo 2");
    await user.keyboard("{Enter}");

    // Complete two todos
    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[1]);
    await user.click(checkboxes[2]);

    expect(screen.getByText("Completed todo 1")).toBeInTheDocument();
    expect(screen.getByText("Completed todo 2")).toBeInTheDocument();

    const clearButton = screen.getByText("Clear completed");
    await user.click(clearButton);

    expect(screen.queryByText("Completed todo 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Completed todo 2")).not.toBeInTheDocument();
    expect(screen.getByText("Active todo")).toBeInTheDocument();
    expect(screen.getByText("1 items left")).toBeInTheDocument();
  });

  it("focuses input on initial render", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("What need to be done?");
    expect(input).toHaveFocus();
  });

  it("updates active count when todos are toggled", async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByPlaceholderText("What need to be done?");

    // Add two todos
    await user.type(input, "Todo 1");
    await user.keyboard("{Enter}");

    await user.type(input, "Todo 2");
    await user.keyboard("{Enter}");

    expect(screen.getByText("2 items left")).toBeInTheDocument();

    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[0]);

    expect(screen.getByText("1 items left")).toBeInTheDocument();
  });
});
