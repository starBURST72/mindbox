import  { useState, ChangeEvent } from "react";

const App = () => {
    const [todos, setTodos] = useState<{ id: number; text: string; completed: boolean }[]>([
        { id: 1, text: "Тестовое задание", completed: false },
        { id: 2, text: "Прекрасный код", completed: true },
        { id: 3, text: "Покрытие тестами", completed: false },
    ]);
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
    const [newTodoText, setNewTodoText] = useState<string>("");

    // Генерация уникального ID для новой задачи
    const generateId = (): number => {
        return todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
    };

    // Добавление новой задачи
    const addTodo = () => {
        if (newTodoText.trim() === "") return;
        setTodos([
            ...todos,
            { id: generateId(), text: newTodoText, completed: false },
        ]);
        setNewTodoText(""); // Очистка поля ввода
    };

    // Удаление завершенных задач
    const clearCompleted = () => {
        setTodos(todos.filter((todo) => !todo.completed));
    };

    // Фильтрация задач
    const filteredTodos = todos.filter((todo) => {
        switch (filter) {
            case "active":
                return !todo.completed;
            case "completed":
                return todo.completed;
            default:
                return true;
        }
    });

    // каунтер для задач
    const remainingCount = todos.filter((todo) => !todo.completed).length;

    return (
        <div className="bg-gray-100 p-4">
            <h1 className="text-center text-5xl font-bold text-pink-300 mb-4">todos</h1>
            <div className="bg-white shadow-md rounded-lg p-4">
                <input
                    type="text"
                    placeholder="What needs to be done?"
                    value={newTodoText}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTodoText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            addTodo();
                        }
                    }}
                    className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-pink-500"
                />

                {/* list tasks */}
                <ul className="divide-y divide-gray-200">
                    {filteredTodos.map((todo) => (
                        <li key={todo.id} className="flex items-center py-2">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() =>
                                    setTodos(
                                        todos.map((t) =>
                                            t.id === todo.id ? { ...t, completed: !t.completed } : t
                                        )
                                    )
                                }
                                className="mr-2 h-5 w-5 accent-pink-500"
                            />
                            <span
                                className={`${
                                    todo.completed ? "line-through text-gray-400" : ""
                                } text-lg`}
                            >
                {todo.text}
              </span>
                        </li>
                    ))}
                </ul>

                {/* list filter */}
                <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-500">{`${remainingCount} items left`}</p>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-2 py-1 rounded ${
                                filter === "all" ? "border-pink-500 border" : ""
                            }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter("active")}
                            className={`px-2 py-1 rounded ${
                                filter === "active" ? "border-pink-500 border" : ""
                            }`}
                        >
                            Active
                        </button>
                        <button
                            onClick={() => setFilter("completed")}
                            className={`px-2 py-1 rounded ${
                                filter === "completed" ? "border-pink-500 border" : ""
                            }`}
                        >
                            Completed
                        </button>
                    </div>
                    <button
                        onClick={clearCompleted}
                        className="text-sm text-gray-500 hover:text-pink-500"
                    >
                        Clear completed
                    </button>
                </div>
            </div>
        </div>
    );
};

export default App;