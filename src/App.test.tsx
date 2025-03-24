import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("ToDo App", () => {
    test("renders the app with initial todos", () => {
        render(<App />);

        // Проверяем заголовок
        const header = screen.getByText(/todos/i);
        expect(header).toBeInTheDocument();

        // Проверяем наличие начальных задач
        expect(screen.getByText("Тестовое задание")).toBeInTheDocument();
        expect(screen.getByText("Прекрасный код")).toBeInTheDocument();
        expect(screen.getByText("Покрытие тестами")).toBeInTheDocument();
    });

    test("adds a new todo", () => {
        render(<App />);

        // Находим поле ввода
        const input = screen.getByPlaceholderText("What needs to be done?");

        // Вводим текст и нажимаем Enter
        fireEvent.change(input, { target: { value: "Новая задача" } });
        fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

        // Проверяем, что задача добавлена
        expect(screen.getByText("Новая задача")).toBeInTheDocument();
    });

    test("marks a todo as completed", () => {
        render(<App />);

        // Находим чекбокс первой задачи
        const checkbox = screen.getAllByRole("checkbox")[0];

        // Кликаем по чекбоксу
        fireEvent.click(checkbox);

        // Проверяем, что задача отмечена как выполненная
        const todoText = screen.getByText("Тестовое задание");
        expect(todoText).toHaveClass("line-through");
    });

    test("filters todos by active", () => {
        render(<App />);

        // Переключаем фильтр на "Active"
        const activeButton = screen.getByText("Active");
        fireEvent.click(activeButton);

        // Проверяем, что видны только активные задачи
        expect(screen.queryByText("Прекрасный код")).not.toBeInTheDocument();
        expect(screen.getByText("Тестовое задание")).toBeInTheDocument();
    });

    test("clears completed todos", () => {
        render(<App />);

        // Нажимаем кнопку "Clear completed"
        const clearButton = screen.getByText("Clear completed");
        fireEvent.click(clearButton);

        // Проверяем, что завершенные задачи удалены
        expect(screen.queryByText("Прекрасный код")).not.toBeInTheDocument();
    });
});