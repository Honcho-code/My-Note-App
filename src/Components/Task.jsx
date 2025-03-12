import React, { useEffect, useState } from "react";

const Task = ({
  darkMode,
  setDardkMode,
  task,
  setTask,
  title,
  setTitle,
  description,
  setDescription,
  date,
  setDate,
  completed,
  showModal,
  setShowModal,
  handleSUbmit,
  deleteTask,
  setEditTask,
  editTask,
  editExistingtask
}) => {

  // Prefill form fields when editing
  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
      setDate(editTask.date);
      setShowModal(true); // Ensure modal opens
    }
  }, [editTask]);

  return (
    <div
      className={`p-4 md:px-6 h-full bg-contain ${
        darkMode ? "bg-zinc-900 text-gray-100 " : "bg-white text-zinc-900"
      }`}
    >
      {task.length < 1 ? (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] place-items-center">
          <h1 className="text-sm md:text-2xl md:font-bold mb-3">
            You have no open task !
          </h1>
          <button
            className="px-5 py-2 bg-blue-500 rounded hover:bg-blue-700"
            onClick={() => setShowModal(true)}
          >
            Add Task
          </button>
        </div>
      ) : (
        <div className="flex flex-col md:grid md:grid-cols-2 gap-4 lg:grid-cols-4">
          {task.map((todo, index) => (
            <div
              key={index}
              className={`p-2 md:p-3 rounded ${
                darkMode ? "bg-zinc-800" : "bg-gray-100"
              }`}
            >
              <h2 className="text-xl md:text-2xl font-bold mb-2">
                {todo.title.toUpperCase()}
              </h2>
              <h2 className="md:text-lg mb-2">{todo.description}</h2>
              <div className="flex justify-between items-end">
                <div className="flex gap-3">
                  <button
                    onClick={() => deleteTask(todo.id)}
                    className="bg-red-500 px-3 py-1 rounded text-white"
                  >
                    Delete Note
                  </button>

                  <button
                    onClick={() => setEditTask(todo)}
                    className={` px-3 py-1 rounded ${
                      darkMode ? "bg-zinc-600 text-zinc-100" : "bg-gray-300 text-gray-800"
                    }`}
                  >
                    Edit Note
                  </button>
                </div>
                <h2>{todo.date}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
      {showModal ? (
        <div className="fixed top-0 inset-0 items-center flex justify-center bg-gray-900 bg-opacity-50 ">
          <div
            className={`bg-white p-6 rounded w-11/12 md:w-3/5 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-lg`}
          >
            <h2 className="text-xl text-zinc-900 font-bold mb-4 flex justify-center">
              {editTask ? "Edit Note" : "Add Note"}
            </h2>
            <form onSubmit={handleSUbmit} className="flex flex-col">
              <label htmlFor="title" className="text-xs mb-2 font-normal">
                Title:
              </label>
              <input
                type="text"
                placeholder="Title"
                value={title}
                id="title"
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded  py-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5 text-black"
                required
              />

              <label htmlFor="desc" className="text-xs mb-2 font-normal">
                Description:
              </label>
              <textarea
                placeholder="Description"
                value={description}
                id="desc"
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded  py-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5 resize-none text-black"
                required
              />
              <label htmlFor="date" className="text-xs mb-2 font-normal">
                Date:
              </label>
              <input
                type="date"
                value={date}
                id="date"
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-300 rounded  py-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5 text-black"
                required
              />
              <div className="flex gap-5">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-3 md:px-6 py-2 rounded hover:bg-blue-700"
                >
                  {editTask ? "Update":"Save"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-black px-3 md:px-6 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Task;
