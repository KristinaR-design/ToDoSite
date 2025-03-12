import 'bootstrap/dist/css/bootstrap.min.css';
import './css/font.css';
import './css/styles.css';
import './css/components.css';

import { useState, useEffect } from "react";
import Header from "./Header";
import History from "./History";
import Footer from "./Footer";
import Card from "./Card";
import { useTheme } from './theme';

function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ name: "", description: "", date: "" });
  const [asave, setAsave] = useState(false);
  const { theme, setTheme } = useTheme();
  const [historyTask, setHistoryTask] = useState([]);
  const [currentPage, setCurrentPage] = useState("tasks");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    const savedHistory = localStorage.getItem("historyTask");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
      setAsave(true);
    }
    if (savedHistory) {
      setHistoryTask(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (asave) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      localStorage.setItem("historyTask", JSON.stringify(historyTask));
    }
  }, [tasks, historyTask]);

  const addTask = () => {
    if (newTask.name.trim() && newTask.description.trim() && newTask.date) {
      setTasks([...tasks, newTask]);
      setNewTask({ name: "", description: "", date: "" });
      setShowForm(false);
    } else {
      alert("Заполните все поля!");
    }
  };


  const updateTask = (index, updatedTask) => {
    const newTasks = [...tasks];
    newTasks[index] = updatedTask;
    setTasks(newTasks);
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleMoveToHistory = (task) => {
    setHistoryTask([...historyTask, task]);
    handleDeleteTask(tasks.indexOf(task));
  };

  return (
    <>
      <Header
        onNewTask={() => setShowForm(!showForm)}
        onNavigate={setCurrentPage}
        onViewHistory={() => setCurrentPage("history")}
      />

      {showForm && (
        <div className="side-panel">
          <div className="side-panel-content">
            <h4>Add task</h4>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <input
              type="datetime-local"
              className="form-control"
              value={newTask.date}
              onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
            />

            <div>
              Pomodoros:
            </div>

            <input
              type="number"
              className="form-control"
              value={newTask.pomo}
              onChange={(e) => setNewTask({ ...newTask, pomo: e.target.value })}
            />

            <button className="AddButton" onClick={addTask}>Add</button>
            <button className="CancelButton" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="container-fluid">
        {currentPage === "tasks" && (
          <div className="row">
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <Card key={index} task={task}
                  onUpdate={(updatedTask) => updateTask(index, updatedTask)}
                  onDelete={() => handleDeleteTask(index)}
                  onMoveToHistory={() => handleMoveToHistory(task)} />
              ))
            ) : (
              <p className="no-tasks">No current tasks</p>
            )}
          </div>
        )}

        {currentPage === "history" && (
          <History historyTasks={historyTask} setCurrentPage={setCurrentPage} />
        )}
      </div>

      <Footer />
    </>
  );
}

export default App;
