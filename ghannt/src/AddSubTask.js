import React, { useState } from 'react';

const EditTaskForm = ({ task, onSave, onCancel }) => {
  const [text, setText] = useState(task.text);
  const [startDate, setStartDate] = useState(task.startDate);
  const [endDate, setEndDate] = useState(task.endDate);
  const [subTasks, setSubTasks] = useState(task.subTasks || []);

  const handleSave = () => {
    onSave({
      ...task,
      text,
      startDate,
      endDate,
      subTasks
    });
  };

  const handleAddSubTask = () => {
    setSubTasks([...subTasks, { id: Date.now(), text: '', startDate, endDate }]);
  };

  return (
    <div className="modal">
      <h2>Edit Task</h2>
      <label>
        Task Name:
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      <label>
        Start Date:
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </label>
      <label>
        End Date:
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </label>
      <h3>Sub-Tasks</h3>
      {subTasks.map((subTask, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Sub-task name"
            value={subTask.text}
            onChange={(e) => {
              const newSubTasks = [...subTasks];
              newSubTasks[index].text = e.target.value;
              setSubTasks(newSubTasks);
            }}
          />
          <input
            type="date"
            value={subTask.startDate}
            onChange={(e) => {
              const newSubTasks = [...subTasks];
              newSubTasks[index].startDate = e.target.value;
              setSubTasks(newSubTasks);
            }}
          />
          <input
            type="date"
            value={subTask.endDate}
            onChange={(e) => {
              const newSubTasks = [...subTasks];
              newSubTasks[index].endDate = e.target.value;
              setSubTasks(newSubTasks);
            }}
          />
        </div>
      ))}
      <button onClick={handleAddSubTask}>Add Sub-task</button>
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditTaskForm;
