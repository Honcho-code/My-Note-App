import React, { useEffect, useState } from "react";

const History = ({ deletedTasks, restoreTask, darkMode }) => {
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const now = Date.now();
    const validTasks = deletedTasks.filter(
      (t) => now - t.deletedAt <= 2 * 24 * 60 * 60 * 1000
    );
    setFilteredTasks(validTasks);
  }, [deletedTasks]);

  return (
    <div className="p-4 md:p-6">
      <h2 className="texl-xl md:text-2xl font-bold text-center mb-4">
        Deleted Tasks (Restorable within 2 days)
      </h2>

      {filteredTasks.length < 1 ? (
        <p className="text-center text-gray-500">No tasks to restore.</p>
      ) : (
        <div className="flex flex-col md:grid md:grid-cols-2 gap-4 lg:grid-cols-4">
          {filteredTasks.map((task, index) => (
            <div
              key={index}
              className={`p-2 md:p-3 rounded ${
                darkMode ? "bg-zinc-800" : "bg-gray-100"
              }`}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-2">{task.title.toUpperCase()}</h3>
              <p className="md:text-lg mb-2">{task.description}</p>
              <div className="flex justify-between items-end">

                <button
                  onClick={() => restoreTask(task.id)}
                  className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Restore
                </button>
                <p className="text-sm text-gray-600">
                  Deleted on: {new Date(task.deletedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
