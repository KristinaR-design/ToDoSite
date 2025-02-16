import 'bootstrap/dist/css/bootstrap.min.css';
import './css/font.css';
import './css/styles.css';
import './css/components.css';

import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Card from "./Card";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false); // Состояние для формы
  const [newTask, setNewTask] = useState({ name: "", description: "", date: "" });//форма для заполнения карточки 
  const [asave, setAsave] = useState(false)

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
      setAsave(true)
    }
  }, []);

  useEffect(() => {
    if (asave) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const updateTask = (index, updatedTask) => {
    const newTasks = [...tasks];
    newTasks[index] = updatedTask;
    setTasks(newTasks);
  };

  const addTask = () => {
    if (newTask.name.trim() && newTask.description.trim() && newTask.date) {
      setTasks([...tasks, newTask]);
      setNewTask({ name: "", description: "", date: "" });
      setShowForm(false);
    } else {
      alert("Заполните все поля!");
    }
  };

  const handleDeleteTask = (index) => {
    const newTask = tasks.filter((_, i) => i !== index);
    setTasks(newTask);
  };

  return (
    <>
      <Header onNewTask={() => setShowForm(!showForm)} />

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
            <button className="AddButton" onClick={addTask}>Add</button>
            <button className="CancelButton" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}


      <div className="container-fluid">
        <div className="row">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <Card key={index} task={task} onUpdate={(updatedTask) => updateTask(index, updatedTask)}
                onDelete={() => handleDeleteTask(index)} />
            ))
          ) : (
            <p className="no-tasks">No current task</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
