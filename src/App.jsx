import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Task from "./Components/Task";
import History from "./Components/History"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [darkMode, setDardkMode] = useState(false);
  const [task, setTask] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [deletedTasks, setDeletedTasks] = useState([]);
  
  useEffect(() => {
    const storedDeletedTasks = localStorage.getItem("deletedTasks");
  
    if (storedDeletedTasks) {
      try {
        const parsedDeletedTasks = JSON.parse(storedDeletedTasks);
        setDeletedTasks(parsedDeletedTasks);
      } catch (e) {
        console.error("Error parsing deletedTasks from localStorage:", e);
        localStorage.removeItem("deletedTasks");
      } 
    }else{
      setDeletedTasks([])
    }
  }, []);
  

  useEffect(() => {
    const storedTasksString = localStorage.getItem("task");

    // const storedDeletedTasks = JSON.parse(localStorage.getItem("deletedTasks")) || [];
    // setDeletedTasks(storedDeletedTasks);
    
    //check if the storedTasksString is not a null or undefined
    if (storedTasksString) {
      try{
      const storedTasks = JSON.parse(storedTasksString);
      setTask(storedTasks);
      } catch(e){
        console.error("Error parsing JSON from localStorage: ", e)
        localStorage.removeItem("task")
      }
    } else {
      setTask([]); // Initialize with an empty array if no data in localStorage
    }
  }, []);

  useEffect(() => {
    // Save tasks to localStorage only if there are tasks to save
    if(task && task.length > 0)
      localStorage.setItem("task", JSON.stringify(task));
  }, [task]);

  useEffect(() => {
    if(deletedTasks && deletedTasks.length > 0)
      localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
  }, [deletedTasks]);


  const deleteTask = (id) => {
    const taskToDelete = task.find((todo) => todo.id === id);
    if (!taskToDelete) return;
  
    // Store the deleted task with a timestamp
    const updatedDeletedTasks = [...deletedTasks, { ...taskToDelete, deletedAt: Date.now() }];
    setDeletedTasks(updatedDeletedTasks);
    localStorage.setItem("deletedTasks", JSON.stringify(updatedDeletedTasks));
  
    // Remove from task list
    setTask(task.filter((todo) => todo.id !== id));
  };

  const restoreTask = (id) => {
    const taskToRestore = deletedTasks.find((t) => t.id === id);
    if (!taskToRestore) return;

    setTask([...task, taskToRestore]);
    setDeletedTasks(deletedTasks.filter((t) => t.id !== id));
  };
  const handleSUbmit = (e) => {
    e.preventDefault();
    if (!title || !description || !date) return;

    if (editTask) {
      // Update existing task
      setTask((prevTasks) =>
        prevTasks.map((todo) =>
          todo.id === editTask.id
            ? { ...todo, title, description, date, completed }
            : todo
        )
      );
      setEditTask(null); // Reset edit mode
    } else {
      // Add new task
      const newTask = {
        id: Date.now(),
        title,
        description,
        date,
        completed: false, // Default new task as incomplete
      };
      setTask((prevTasks) => [...prevTasks, newTask]);
    }

    // Reset form fields
    setTitle("");
    setDescription("");
    setDate("");
    setCompleted(false);
    setShowModal(false);
  };
  

  const editExistingtask = (updatedTodo)=>{
    setTask(task.map((todo)=>(todo.id === updatedTodo ? updatedTodo : task)))
    setEditTask(null)
    setShowModal(false)
  }
  return (
    <Router>
    <div
      className={`min-h-screen ${
        darkMode ? "bg-zinc-900 text-white" : "bg-white text-zinc-900"
      } flex flex-col`}
    >
      <Navbar darkMode={darkMode} setDardkMode={setDardkMode} showModal={showModal} setShowModal={setShowModal}/>
      <Routes>
        <Route path="/" element={<Task
          darkMode={darkMode}
          setDardkMode={setDardkMode}
          task={task}
          setTask={setTask}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          date={date}
          setDate={setDate}
          completed={setCompleted}
          showModal={showModal}
          setShowModal={setShowModal}
          handleSUbmit={handleSUbmit}
          deleteTask={deleteTask}
          editTask={editTask}
          setEditTask={setEditTask}
          editExistingtask={editExistingtask}
        />}/>
        <Route path="/history" element={<History deletedTasks={deletedTasks} restoreTask={restoreTask} darkMode={darkMode}
          setDardkMode={setDardkMode}/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
