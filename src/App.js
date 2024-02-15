import { useState } from "react";

export default function App() {
  return (
    <div>
      <ToDoWrapper />
    </div>
  );
}

function ToDoWrapper() {
  return (
    <div className="todowrapper">
      <h2>Get things done💯</h2>
      <ToDoForm />
    </div>
  );
}

function ToDoForm() {
  const tasks = [
    { text: "Read book", id: 1, done: false },
    { text: "Run", id: 2, done: false },
  ];

  const [task, setTask] = useState(tasks);

  function handleAddTaks(newTask) {
    if (!newTask) return alert("You can't add empty task.");
    setTask((tasks) => [
      ...tasks,
      { text: newTask, id: Date.now(), done: false },
    ]);
  }

  function handleDeleteTask(id) {
    setTask((tasks) => tasks.filter((task) => task.id !== id));
  }

  function handleToggle(id) {
    setTask(
      task.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  return (
    <div className="todoform">
      <AddToDo onAdd={handleAddTaks} />
      <ToDoTasks
        tasks={task}
        onDelete={handleDeleteTask}
        onToggle={handleToggle}
      />
    </div>
  );
}

function AddToDo({ onAdd }) {
  const [newTask, setNewTask] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAdd(newTask);
    setNewTask("");
  }

  return (
    <form className="addtodo" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function ToDoTasks({ tasks, onDelete, onToggle }) {
  return (
    <div className="tasks">
      <ul>
        {tasks.map((task) => (
          <ToDoTask
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
            key={task.id}
          />
        ))}
      </ul>
    </div>
  );
}

function ToDoTask({ task, onDelete, onToggle }) {
  return (
    <li className="task">
      <input
        className="checkbox"
        type="checkbox"
        value={task.done}
        onChange={() => onToggle(task.id)}
      />
      <span style={task.done ? { textDecoration: "line-through" } : {}}>
        {task.text}
      </span>
      <button onClick={() => onDelete(task.id)}>&times;</button>
    </li>
  );
}
